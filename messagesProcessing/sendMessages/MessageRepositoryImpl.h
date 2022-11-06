#pragma once

#include <memory>

#include "DatabaseConnector.h"
#include "MessageRepository.h"
#include "RepeatedByMapper.h"

class MessageRepositoryImpl : public MessageRepository
{
public:
    MessageRepositoryImpl(std::unique_ptr<DatabaseConnector> databaseConnectorInit,
                          std::unique_ptr<RepeatedByMapper> repeatedByMapperInit);
    
    std::vector<Message> findMany() override;

private:
    std::unique_ptr<DatabaseConnector> databaseConnector;
    std::unique_ptr<RepeatedByMapper> repeatedByMapper;
};

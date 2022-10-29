#pragma once

#include <memory>
#include <tao/pq.hpp>

#include "DatabaseConnector.h"
#include "MessageRepository.h"

class MessageRepositoryImpl : public MessageRepository
{
public:
    MessageRepositoryImpl(std::unique_ptr<DatabaseConnector> databaseConnectorInit);
    std::vector<Message> findMany() override;

private:
    std::unique_ptr<DatabaseConnector> databaseConnector;
};

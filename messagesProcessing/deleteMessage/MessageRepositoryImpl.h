#pragma once

#include <memory>

#include "DatabaseConnector.h"
#include "MessageRepository.h"

class MessageRepositoryImpl : public MessageRepository
{
public:
    explicit MessageRepositoryImpl(std::unique_ptr<DatabaseConnector> databaseConnectorInit);

    void deleteOne(const std::string& messageId) override;

private:
    std::unique_ptr<DatabaseConnector> databaseConnector;
};

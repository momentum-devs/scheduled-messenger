#include "MessageRepositoryImpl.h"

#include <fmt/core.h>

MessageRepositoryImpl::MessageRepositoryImpl(std::unique_ptr<DatabaseConnector> databaseConnectorInit)
    : databaseConnector{std::move(databaseConnectorInit)}
{
}

void MessageRepositoryImpl::deleteOne(const std::string& messageId)
{
    const auto connection = databaseConnector->getConnection();

    const auto deleteMessageQuery = fmt::format("DELETE FROM messages WHERE id = {}", messageId);

    connection->execute(deleteMessageQuery);
}

#include "DatabaseConnector.h"

#include "fmt/core.h"

DatabaseConnector::DatabaseConnector(const DatabaseConfig& configInit) : config{configInit} {}

std::shared_ptr<tao::pq::connection> DatabaseConnector::getConnection()
{
    if (!connection || connection->status() != tao::pq::connection_status::ok)
    {
        const auto uri = fmt::format("postgresql://{}:{}@{}:{}/{}", config.username, config.password, config.host,
                                     config.port, config.databaseName);

        connection = tao::pq::connection::create(uri);
    }

    return connection;
}

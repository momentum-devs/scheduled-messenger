#include "DatabaseConnector.h"

#include <utility>

#include "fmt/core.h"

DatabaseConnector::DatabaseConnector(const std::unique_ptr<Config>& configInit) : config{configInit} {}

std::shared_ptr<tao::pq::connection> DatabaseConnector::getConnection()
{
    if (!connection || connection->status() != tao::pq::connection_status::ok)
    {
        const auto uri =
            fmt::format("postgresql://{}:{}@{}:{}/{}", config->databaseConfig.username, config->databaseConfig.password,
                        config->databaseConfig.host, config->databaseConfig.port, config->databaseConfig.databaseName);

        connection = tao::pq::connection::create(uri);
    }

    return connection;
}

#include "DatabaseConnector.h"

#include <utility>

#include "fmt/core.h"

DatabaseConnector::DatabaseConnector(DatabaseConfig databaseConfigInit) : databaseConfig(std::move(databaseConfigInit))
{
}

std::shared_ptr<tao::pq::connection> DatabaseConnector::getConnection()
{
    if (!connection || connection->status() != tao::pq::connection_status::ok)
    {
        const auto uri = fmt::format("postgresql://{}:{}@{}:{}/{}", databaseConfig.username, databaseConfig.password,
                                     databaseConfig.host, databaseConfig.port, databaseConfig.databaseName);

        connection = tao::pq::connection::create(uri);
    }

    return connection;
}

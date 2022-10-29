#include "DatabaseConnector.h"

#include "fmt/core.h"

DatabaseConnector::DatabaseConnector(DatabaseConfig databaseConfigInit) : databaseConfig(databaseConfigInit)
{
    connectToDatabase();
}

std::shared_ptr<tao::pq::connection> DatabaseConnector::getConnection()
{
    if (connection->status() != tao::pq::connection_status::ok)
    {
        connectToDatabase();
    }
    return connection;
}

void DatabaseConnector::connectToDatabase()
{
    const auto uri = fmt::format("postgresql://{}:{}@{}:{}/{}", databaseConfig.username, databaseConfig.password,
                                 databaseConfig.host, databaseConfig.port, databaseConfig.databaseName);

    connection = tao::pq::connection::create(uri);
}

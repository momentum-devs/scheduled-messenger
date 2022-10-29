#pragma once

#include <memory>
#include <tao/pq.hpp>

#include "DatabaseConfig.h"

class DatabaseConnector
{
public:
    DatabaseConnector(DatabaseConfig);
    std::shared_ptr<tao::pq::connection> getConnection();

private:
    void connectToDatabase();

    std::shared_ptr<tao::pq::connection> connection;
    DatabaseConfig databaseConfig;
};
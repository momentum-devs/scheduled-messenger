#pragma once

#include "DatabaseConfig.h"

struct Config
{
    Config(DatabaseConfig databaseConfigInit, std::string eventBusArnInit)
        : databaseConfig(databaseConfigInit), eventBusArn(eventBusArnInit){};
    DatabaseConfig databaseConfig;
    std::string eventBusArn;
};
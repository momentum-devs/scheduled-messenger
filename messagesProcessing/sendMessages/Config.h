#pragma once

#include "DatabaseConfig.h"

struct Config
{
    Config(DatabaseConfig databaseConfigInit, std::string resourceArnInit)
        : databaseConfig(databaseConfigInit), resourceArn(resourceArnInit){};
    DatabaseConfig databaseConfig;
    std::string resourceArn;
};
#pragma once

#include "DatabaseConfig.h"

struct Config
{
    DatabaseConfig databaseConfig;
    std::string eventBusArn;
    std::string timeWindow;
};
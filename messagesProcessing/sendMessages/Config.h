#pragma once

#include "DatabaseConfig.h"
#include "SmtpHostConfig.h"

struct Config
{
    DatabaseConfig databaseConfig;
    std::string timeWindow;
    SmtpHostConfig smtpHostConfig;
};
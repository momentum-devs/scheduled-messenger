#pragma once

#include "DatabaseConfig.h"
#include "SmtpHostConfig.h"

struct Config
{
    DatabaseConfig databaseConfig;
    int timeWindow;
    SmtpHostConfig smtpHostConfig;
};

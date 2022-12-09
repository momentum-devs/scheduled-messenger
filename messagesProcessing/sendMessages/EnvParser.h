#pragma once

#include <string>

class EnvParser
{
public:
    std::string parseString(const std::string& envName);
    int parseInt(const std::string& envName);
};

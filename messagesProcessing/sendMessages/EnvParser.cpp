#include "EnvParser.h"

#include "exceptions/EnvParseError.h"
#include "fmt/format.h"

std::string EnvParser::parseString(const std::string& envName)
{
    auto envValue = std::getenv(envName.c_str());

    if (!envValue)
    {
        throw EnvParseError(fmt::format("Error parsing env variable {}", envName));
    }

    return envValue;
}

int EnvParser::parseInt(const std::string& envName)
{
    auto envValue = std::getenv(envName.c_str());

    if (!envValue)
    {
        throw EnvParseError(fmt::format("Error parsing env variable {}", envName));
    }

    return std::stoi(envValue);
}

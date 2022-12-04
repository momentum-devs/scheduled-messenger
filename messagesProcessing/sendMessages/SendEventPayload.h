#pragma once

#include <string>

struct SendEventPayload
{
    std::string body;
    std::string type;
    std::string resourceArn;
    std::string source;
};
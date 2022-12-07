#pragma once

#include <string>

struct Endpoint
{
    std::string address;
    int port;
};

inline bool operator==(const Endpoint& lhs, const Endpoint& rhs)
{
    return (lhs.address == rhs.address) and (lhs.port == rhs.port);
}
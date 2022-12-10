#pragma once

#include <ostream>
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

inline std::ostream& operator<<(std::ostream& os, const Endpoint& endpoint)
{
    return os << "address: " << endpoint.address << " port: " << endpoint.port;
}

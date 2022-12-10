#pragma once

#include <ostream>
#include <string>

struct EmailReceiver
{
    std::string address;
    std::string name;
};

inline std::ostream& operator<<(std::ostream& os, const EmailReceiver& emailReceiver)
{
    return os << "address: " << emailReceiver.address << " name: " << emailReceiver.name;
}

inline bool operator==(const EmailReceiver& lhs, const EmailReceiver& rhs)
{
    return (lhs.address == rhs.address) and (lhs.name == rhs.name);
}

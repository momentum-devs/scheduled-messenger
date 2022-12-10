#pragma once

#include <ostream>
#include <string>

struct EmailSender
{
    std::string address;
    std::string name;
    std::string password;
};

inline std::ostream& operator<<(std::ostream& os, const EmailSender& emailSender)
{
    return os << "address: " << emailSender.address << " name: " << emailSender.name
              << " password: " << emailSender.password;
}

inline bool operator==(const EmailSender& lhs, const EmailSender& rhs)
{
    return (lhs.address == rhs.address) and (lhs.name == rhs.name) and (lhs.password == rhs.password);
}

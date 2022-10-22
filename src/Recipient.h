#pragma once

#include <optional>
#include <string>

struct Recipient
{
    std::string id;
    std::optional<std::string> name;
    std::optional<std::string> emailAddress;
    std::optional<std::string> phoneNumber;
};

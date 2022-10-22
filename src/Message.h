#pragma once

#include <optional>
#include <string>

#include "Recipient.h"
#include "User.h"

struct Message
{
    std::string id;
    std::string text;
    std::optional<std::string> title;
    std::string sendDate;
    User user;
    Recipient recipient;
};

#pragma once

#include <optional>
#include <string>

#include "Recipient.h"
#include "User.h"

struct Message
{
    std::string id;
    std::string content;
    std::optional<std::string> title;
    std::string type;
    std::string sendDate;
    User user;
    Recipient recipient;
};

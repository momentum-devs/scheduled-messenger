#pragma once

#include <string>

#include "Recipient.h"
#include "User.h"

struct Message
{
    std::string id;
    std::string text;
    std::string title;
    std::string sendDate;
    std::string repeatBy;
    User user;
    Recipient recipient;
};

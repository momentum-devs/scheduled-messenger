#pragma once

#include <string>

#include "Recipient.h"
#include "RepeatedBy.h"
#include "User.h"

struct Message
{
    std::string id;
    std::string text;
    std::string title;
    std::string sendDate;
    RepeatedBy repeatBy;
    User user;
    Recipient recipient;
};

#pragma once

#include <vector>

#include "Message.h"

class MessageRepository
{
public:
    virtual ~MessageRepository() = default;

    virtual std::vector<Message> findMany() = 0;
};

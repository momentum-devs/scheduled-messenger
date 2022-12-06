#pragma once

#include <vector>

#include "Message.h"

class MessageRepository
{
public:
    virtual ~MessageRepository() = default;

    virtual std::vector<Message> findMany() = 0;
    virtual void deleteOne(const std::string& id) = 0;
};

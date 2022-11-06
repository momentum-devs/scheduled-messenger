#pragma once

#include <string>

class MessageRepository
{
public:
    virtual ~MessageRepository() = default;

    virtual void deleteOne(const std::string& messageId) = 0;
};

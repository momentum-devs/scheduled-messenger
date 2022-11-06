#pragma once

class DeleteMessageCommand
{
public:
    virtual ~DeleteMessageCommand() = default;

    virtual void execute(const std::string& messageId) const = 0;
};

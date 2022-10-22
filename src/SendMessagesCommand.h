#pragma once

class SendMessagesCommand
{
public:
    virtual ~SendMessagesCommand() = default;

    virtual void execute() const = 0;
};

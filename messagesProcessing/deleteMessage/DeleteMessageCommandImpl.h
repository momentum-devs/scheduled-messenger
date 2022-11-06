#pragma once

#include <memory>
#include <span>

#include "DeleteMessageCommand.h"
#include "MessageRepository.h"

class DeleteMessageCommandImpl : public DeleteMessageCommand
{
public:
    explicit DeleteMessageCommandImpl(std::unique_ptr<MessageRepository>);

    void execute(const std::string& messageId) const override;

private:
    std::unique_ptr<MessageRepository> messageRepository;
};

#pragma once

#include <memory>

#include "EmailClient.h"
#include "MessageRepository.h"
#include "SendMessagesCommand.h"

class SendMessagesCommandImpl : public SendMessagesCommand
{
public:
    SendMessagesCommandImpl(std::unique_ptr<EmailClient>, std::unique_ptr<MessageRepository>);

    void execute() const override;

private:
    bool verifyDate(std::string);

    std::unique_ptr<EmailClient> emailClient;
    std::unique_ptr<MessageRepository> messageRepository;
};

#pragma once

#include <memory>

#include "DateService.h"
#include "EmailClient.h"
#include "MessageRepository.h"
#include "SendMessagesCommand.h"

class SendMessagesCommandImpl : public SendMessagesCommand
{
public:
    SendMessagesCommandImpl(std::unique_ptr<EmailClient>, std::unique_ptr<MessageRepository>,
                            std::unique_ptr<DateService>);

    void execute() const override;

private:
    std::unique_ptr<EmailClient> emailClient;
    std::unique_ptr<MessageRepository> messageRepository;
    std::unique_ptr<DateService> dateService;
};

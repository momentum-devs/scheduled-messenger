#pragma once

#include <memory>
#include <span>

#include "Config.h"
#include "DateService.h"
#include "EmailClient.h"
#include "EventSender.h"
#include "MessageRepository.h"
#include "SendMessagesCommand.h"

class SendMessagesCommandImpl : public SendMessagesCommand
{
public:
    SendMessagesCommandImpl(std::unique_ptr<EmailClient>, std::unique_ptr<MessageRepository>,
                            std::unique_ptr<DateService>, std::unique_ptr<EventSender>, const std::unique_ptr<Config>&);

    void execute() const override;

private:
    void sendMessagesBatch(std::span<const Message> messagesBatch, const std::string& startDate) const;

    std::unique_ptr<EmailClient> emailClient;
    std::unique_ptr<MessageRepository> messageRepository;
    std::unique_ptr<DateService> dateService;
    std::unique_ptr<EventSender> eventSender;
    const std::unique_ptr<Config>& config;
    int timeWindow;
};

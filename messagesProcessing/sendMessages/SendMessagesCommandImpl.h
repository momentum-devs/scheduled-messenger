#pragma once

#include <memory>
#include <span>

#include "Config.h"
#include "DateService.h"
#include "EmailClient.h"
#include "HostResolver.h"
#include "MessageRepository.h"
#include "SendMessagesCommand.h"

class SendMessagesCommandImpl : public SendMessagesCommand
{
public:
    SendMessagesCommandImpl(std::unique_ptr<EmailClient>, std::unique_ptr<MessageRepository>,
                            std::unique_ptr<DateService>, std::unique_ptr<HostResolver>,
                            const Config&);

    void execute() const override;

private:
    void sendMessagesBatch(std::span<const Message> messagesBatch, const std::string& startDate) const;

    std::unique_ptr<EmailClient> emailClient;
    std::unique_ptr<MessageRepository> messageRepository;
    std::unique_ptr<DateService> dateService;
    std::unique_ptr<HostResolver> hostResolver;
    const Config& config;
    int timeWindow;
};

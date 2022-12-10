#include "SendMessagesCommandImpl.h"

#include <functional>
#include <future>
#include <iostream>

#include "exceptions/EmailRequiredFieldsNotProvidedError.h"

SendMessagesCommandImpl::SendMessagesCommandImpl(std::unique_ptr<EmailClient> emailClientInit,
                                                 std::unique_ptr<MessageRepository> messageRepositoryInit,
                                                 std::unique_ptr<DateService> dateServiceInit,
                                                 std::unique_ptr<HostResolver> hostResolverInit, int timeWindowInit)
    : emailClient{std::move(emailClientInit)},
      messageRepository{std::move(messageRepositoryInit)},
      dateService{std::move(dateServiceInit)},
      hostResolver{std::move(hostResolverInit)},
      timeWindow{timeWindowInit}
{
}

void SendMessagesCommandImpl::execute() const
{
    const auto startDate = dateService->getCurrentDate();

    const auto messages = messageRepository->findMany();

    auto numberOfThreads = std::thread::hardware_concurrency();

    if (numberOfThreads == 0)
    {
        numberOfThreads = 1;
    }

    std::vector<std::future<void>> futures(numberOfThreads);

    for (auto i = 0l; i < numberOfThreads; ++i)
    {
        auto lowerLimit = i * messages.size() / numberOfThreads;

        auto upperLimit = (i + 1) * messages.size() / numberOfThreads;

        auto count = upperLimit - lowerLimit;

        auto messageSpan = std::span{messages}.subspan(lowerLimit, count);

        futures[i] = std::async(&SendMessagesCommandImpl::sendMessagesBatch, this, messageSpan, startDate);
    }

    for (auto& future : futures)
    {
        future.get();
    }
}

void SendMessagesCommandImpl::sendMessagesBatch(std::span<const Message> messagesBatch,
                                                const std::string& startDate) const
{
    for (const auto& message : messagesBatch)
    {
        std::cout << "start: " << startDate << " messageDate: " << message.sendDate << " timeWindow: " << timeWindow
                  << std::endl;

        if (!dateService->isDateWithinRecurringTimePeriod({message.sendDate, startDate, message.repeatBy, timeWindow}))
        {
            std::cout << message.sendDate << " should not be send" << std::endl;

            continue;
        }

        std::cout << message.sendDate << " should be send" << std::endl;

        EmailSender emailSender{message.user.emailAddress, message.displayName, message.user.emailPassword};

        EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};

        const auto smtpEndpoint = hostResolver->resolve(message.user.emailAddress);

        SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text, smtpEndpoint};

        std::cout << "payload: " << emailPayload << std::endl;

        try
        {
            emailClient->sendEmail(emailPayload);
        }
        catch (const std::runtime_error& error)
        {
            std::cerr << error.what() << std::endl;

            continue;
        }

        if (message.repeatBy == RepeatedBy::NONE)
        {
            messageRepository->deleteOne(message.id);
        }
    }
}

#include "SendMessagesCommandImpl.h"

#include <functional>
#include <future>

#include "exceptions/EmailRequiredFieldsNotProvidedError.h"

SendMessagesCommandImpl::SendMessagesCommandImpl(std::unique_ptr<EmailClient> emailClientInit,
                                                 std::unique_ptr<MessageRepository> messageRepositoryInit,
                                                 std::unique_ptr<DateService> dateServiceInit)
    : emailClient{std::move(emailClientInit)},
      messageRepository{std::move(messageRepositoryInit)},
      dateService{std::move(dateServiceInit)},
      timeWindow{5}
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
        if (!dateService->isDateWithinRecurringTimePeriod({message.sendDate, startDate, message.repeatBy, timeWindow}))
        {
            continue;
        }

        EmailSender emailSender{message.user.emailAddress, message.displayName, message.user.emailPassword};

        EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};

        SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text};

        emailClient->sendEmail(emailPayload);
    }
}

#include "SendMessagesCommandImpl.h"

#include "exceptions/EmailRequiredFieldsNotProvidedError.h"

SendMessagesCommandImpl::SendMessagesCommandImpl(std::unique_ptr<EmailClient> emailClientInit,
                                                 std::unique_ptr<MessageRepository> messageRepositoryInit,
                                                 std::unique_ptr<DateService> dateServiceInit)
    : emailClient{std::move(emailClientInit)},
      messageRepository{std::move(messageRepositoryInit)},
      dateService{std::move(dateServiceInit)}
{
}

void SendMessagesCommandImpl::execute() const
{
    const auto startDate = dateService->getCurrentDate();
    const auto messages = messageRepository->findMany();

    // TODO: send async
    for (const auto& message : messages)
    {
        if (!dateService->isDateWithinRecurringTimePeriod({message.sendDate, startDate, message.repeatBy, 5}))
        {
            continue;
        }

        EmailSender emailSender{message.user.emailAddress, message.displayName, message.user.emailPassword};

        EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};

        SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text};

        emailClient->sendEmail(emailPayload);
    }
}
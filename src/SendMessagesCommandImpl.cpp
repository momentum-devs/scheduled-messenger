#include "SendMessagesCommandImpl.h"

#include "exceptions/EmailRequiredFieldsNotProvidedError.h"

SendMessagesCommandImpl::SendMessagesCommandImpl(std::unique_ptr<EmailClient> emailClientInit,
                                                 std::unique_ptr<MessageRepository> messageRepositoryInit)
    : emailClient{std::move(emailClientInit)}, messageRepository{std::move(messageRepositoryInit)}
{
}

void SendMessagesCommandImpl::execute() const
{
    const auto messages = messageRepository->findMany();

    // TODO: send async
    for (const auto& message : messages)
    {
        validateEmailMessage(message);

        EmailSender emailSender{*message.user.emailAddress, *message.user.name, *message.user.emailPassword};

        EmailReceiver emailReceiver{*message.recipient.emailAddress, *message.recipient.name};

        SendEmailPayload emailPayload{emailSender, emailReceiver, *message.title, message.text};

        emailClient->sendEmail(emailPayload);
    }
}

void SendMessagesCommandImpl::validateEmailMessage(const Message& message) const
{
    const auto userIsValid = message.user.emailAddress && message.user.name && message.user.emailPassword;

    const auto recipientIsValid = message.recipient.name && message.recipient.emailAddress;

    const auto messageIsValid = message.title && userIsValid && recipientIsValid;

    if (!messageIsValid)
    {
        throw EmailRequiredFieldsNotProvidedError{"Email required fields not provided."};
    }
}

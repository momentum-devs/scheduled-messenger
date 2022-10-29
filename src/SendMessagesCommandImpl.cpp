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
        // TODO: add date&&time validation

        EmailSender emailSender{message.user.emailAddress, message.user.name, message.user.emailPassword};

        EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};

        SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text};

        emailClient->sendEmail(emailPayload);
    }
}
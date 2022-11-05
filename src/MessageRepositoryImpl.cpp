#include "MessageRepositoryImpl.h"

#include <fmt/core.h>

namespace
{
std::string messageId = "id";
std::string messageTitle = "title";
std::string messageContent = "content";
std::string messageSendDate = "send_date";
std::string messageRepeatBy = "repeat_by";
std::string userId = "user.id";
std::string userName = "user.name";
std::string userEmail = "user.email";
std::string userPassword = "password";
std::string recipientId = "recipient.id";
std::string recipientEmail = "recipient.email";
std::string recipientName = "recipient.name";
}

MessageRepositoryImpl::MessageRepositoryImpl(std::unique_ptr<DatabaseConnector> databaseConnectorInit,
                                             std::unique_ptr<RepeatedByMapper> repeatedByMapperInit)
    : databaseConnector{std::move(databaseConnectorInit)}, repeatedByMapper{std::move(repeatedByMapperInit)}
{
}

std::vector<Message> MessageRepositoryImpl::findMany()
{
    auto messages = std::vector<Message>();
    const auto connection = databaseConnector->getConnection();

    const auto findManyMessagesQuery = R"(
                                    SELECT
                                        messages.id,
                                        messages.title,
                                        messages."content",
                                        messages."type",
                                        messages.send_date,
                                        messages.repeat_by,
                                        users."id" as "user.id",
                                        users."name" as "user.name",
                                        users."password",
                                        users.email as "user.email",
                                        recipients."id" as "recipient.id",
                                        recipients."name" as "recipient.name",
                                        recipients.email as "recipient.email",
                                    FROM messages
                                        JOIN users on (messages.user_id = users.id)
                                        JOIN recipients ON (messages.recipient_id = recipients.id);)";

    const auto messagesRows = connection->execute(findManyMessagesQuery);

    for (const auto& messageRow : messagesRows)
    {
        User user{messageRow[userId].as<std::string>(), messageRow[userName].as<std::string>(),
                  messageRow[userEmail].as<std::string>(), messageRow[userPassword].as<std::string>()};

        Recipient recipient{messageRow[recipientId].as<std::string>(), messageRow[recipientName].as<std::string>(),
                            messageRow[recipientEmail].as<std::string>()};

        Message message{messageRow[messageId].as<std::string>(),
                        messageRow[messageContent].as<std::string>(),
                        messageRow[messageTitle].as<std::string>(),
                        messageRow[messageSendDate].as<std::string>(),
                        repeatedByMapper->map(messageRow[messageRepeatBy].as<std::string>()),
                        user,
                        recipient};

        messages.push_back(message);
    }

    return messages;
}
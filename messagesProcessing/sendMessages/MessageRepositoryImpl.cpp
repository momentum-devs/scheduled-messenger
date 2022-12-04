#include "MessageRepositoryImpl.h"

namespace
{
const auto messageId = "id";
const auto messageTitle = "title";
const auto messageContent = "content";
const auto messageSendDate = "sendDate";
const auto messageRepeatBy = "repeatBy";
const auto userId = "user.id";
const auto userEmail = "user.email";
const auto userPassword = "password";
const auto recipientId = "recipient.id";
const auto recipientEmail = "recipient.email";
const auto recipientName = "recipient.name";
const auto displayName = "displayName";
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
                                        messages.sendDate,
                                        messages.repeatBy,
                                        messages.displayName as displayName,
                                        users."id" as "user.id",
                                        users."password",
                                        users.email as "user.email",
                                        recipients."id" as "recipient.id",
                                        recipients."name" as "recipient.name",
                                        recipients.email as "recipient.email",
                                    FROM messages
                                        JOIN users on (messages.userId = users.id)
                                        JOIN recipients ON (messages.recipientId = recipients.id);)";

    const auto messagesRows = connection->execute(findManyMessagesQuery);

    for (const auto& messageRow : messagesRows)
    {
        User user{messageRow[userId].as<std::string>(), messageRow[userEmail].as<std::string>(),
                  messageRow[userPassword].as<std::string>()};

        Recipient recipient{messageRow[recipientId].as<std::string>(), messageRow[recipientName].as<std::string>(),
                            messageRow[recipientEmail].as<std::string>()};

        Message message{messageRow[messageId].as<std::string>(),
                        messageRow[messageContent].as<std::string>(),
                        messageRow[messageTitle].as<std::string>(),
                        messageRow[messageSendDate].as<std::string>(),
                        repeatedByMapper->map(messageRow[messageRepeatBy].as<std::optional<std::string>>()),
                        messageRow[displayName].as<std::string>(),
                        user,
                        recipient};

        messages.push_back(message);
    }

    return messages;
}

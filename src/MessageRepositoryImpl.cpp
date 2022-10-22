#include "MessageRepositoryImpl.h"

#include <fmt/core.h>

namespace
{
std::string messageId = "id";
std::string messageTitle = "title";
std::string messagesContent = "content";
std::string messagesType = "type";
std::string messageSendDate = "send_date";
std::string userId = "user.id";
std::string userName = "user.name";
std::string userEmail = "user.email";
std::string userPassword = "password";
std::string userPhoneNumber = "user.phone";
std::string recipientId = "recipient.id";
std::string recipientEmail = "recipient.email";
std::string recipientName = "recipient.name";
std::string recipientPhoneNumber = "recipient.phone";
}

std::vector<Message> MessageRepositoryImpl::findMany() const
{
    auto messages = std::vector<Message>();
    const auto connection = getConnection();

    const auto findManyMessagesQuery = R"(
                                    SELECT
                                        messages.id,
                                        messages.title,
                                        messages."content",
                                        messages."type",
                                        messages.send_date,
                                        users."id" as "user.id",
                                        users."name" as "user.name",
                                        users."password",
                                        users.email as "user.email",
                                        users.phone as "user.phone",
                                        recipients."id" as "recipient.id",
                                        recipients."name" as "recipient.name",
                                        recipients.email as "recipient.email",
                                        recipients.phone as "recipient.phone"
                                    FROM messages
                                        JOIN users on (messages.user_id = users.id)
                                        JOIN recipients ON (messages.recipient_id = recipients.id)
                                    WHERE messages.send_date = now()::date;)";

    const auto messagesRows = connection->execute(findManyMessagesQuery);

    for (const auto& messageRow : messagesRows)
    {
        User user{messageRow[userId].as<std::string>(), messageRow[userName].as<std::string>(),
                  messageRow[userEmail].as<std::string>(), messageRow[userPassword].as<std::string>(),
                  messageRow[userPhoneNumber].as<std::string>()};

        Recipient recipient{messageRow[recipientId].as<std::string>(), messageRow[recipientName].as<std::string>(),
                            messageRow[recipientEmail].as<std::string>(),
                            messageRow[recipientPhoneNumber].as<std::string>()};

        Message message{messageRow[messageId].as<std::string>(),
                        messageRow[messagesContent].as<std::string>(),
                        messageRow[messageTitle].as<std::string>(),
                        messageRow[messagesType].as<std::string>(),
                        messageRow[messageSendDate].as<std::string>(),
                        user,
                        recipient};

        messages.push_back(message);
    }

    return messages;
}

std::shared_ptr<tao::pq::connection> MessageRepositoryImpl::getConnection() const
{
    const std::string username = std::getenv("DB_USERNAME");
    const std::string password = std::getenv("DB_PASSWORD");
    const std::string host = std::getenv("DB_HOST");
    const std::string port = std::getenv("DB_PORT");
    const std::string databaseName = std::getenv("DB_NAME");

    const auto uri = fmt::format("postgresql://{}:{}@{}:{}/{}", username, password, host, port, databaseName);

    auto connection = tao::pq::connection::create(uri);

    return connection;
}

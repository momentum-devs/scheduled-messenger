#include <aws/lambda-runtime/runtime.h>

#include "DatabaseConfig.h"
#include "DatabaseConnector.h"
#include "DateServiceImpl.h"
#include "EventSenderImpl.h"
#include "MailioClient.h"
#include "MessageRepositoryImpl.h"
#include "RepeatedByMapperImpl.h"
#include "SendMessagesCommandImpl.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const&)
{
    DatabaseConfig databaseConfig{
        std::getenv("DB_USERNAME"), std::getenv("DB_PASSWORD"), std::getenv("DB_HOST"),
        std::getenv("DB_PORT"),     std::getenv("DB_NAME"),
    };
    std::unique_ptr<DatabaseConnector> databaseConnector = std::make_unique<DatabaseConnector>(databaseConfig);
    std::unique_ptr<EmailClient> emailClient = std::make_unique<MailioClient>();
    std::unique_ptr<RepeatedByMapper> repeatedByMapper = std::make_unique<RepeatedByMapperImpl>();
    std::unique_ptr<MessageRepository> messageRepository =
        std::make_unique<MessageRepositoryImpl>(std::move(databaseConnector), std::move(repeatedByMapper));
    std::unique_ptr<DateService> dateService = std::make_unique<DateServiceImpl>();
    std::unique_ptr<EventSender> eventSender = std::make_unique<EventSenderImpl>();

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClient), std::move(messageRepository),
                                                std::move(dateService), std::move(eventSender)};

    sendMessagesCommand.execute();

    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

#include <aws/lambda-runtime/runtime.h>

#include "Config.h"
#include "DatabaseConfig.h"
#include "DatabaseConnector.h"
#include "DateServiceImpl.h"
#include "EventSenderImpl.h"
#include "HostResolverImpl.h"
#include "MailioClient.h"
#include "MessageRepositoryImpl.h"
#include "RepeatedByMapperImpl.h"
#include "SendMessagesCommandImpl.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const&)
{
    Config config{DatabaseConfig{
                      std::getenv("DB_USERNAME"),
                      std::getenv("DB_PASSWORD"),
                      std::getenv("DB_HOST"),
                      std::getenv("DB_PORT"),
                      std::getenv("DB_NAME"),
                  },
                  std::getenv("EVENT_BUS_ARN"), std::getenv("TIME_WINDOW")};

    std::unique_ptr<DatabaseConnector> databaseConnector = std::make_unique<DatabaseConnector>(config);
    std::unique_ptr<EmailClient> emailClient = std::make_unique<MailioClient>();
    std::unique_ptr<RepeatedByMapper> repeatedByMapper = std::make_unique<RepeatedByMapperImpl>();
    std::unique_ptr<MessageRepository> messageRepository =
        std::make_unique<MessageRepositoryImpl>(std::move(databaseConnector), std::move(repeatedByMapper));
    std::unique_ptr<DateService> dateService = std::make_unique<DateServiceImpl>();
    std::unique_ptr<EventSender> eventSender = std::make_unique<EventSenderImpl>();
    std::unique_ptr<HostResolver> hostResolver = std::make_unique<HostResolverImpl>();

    eventSender->sendEvent(SendEventPayload{"123", "DeleteMessage", config.eventBusArn, "com.messages.delete"});

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClient),  std::move(messageRepository),
                                                std::move(dateService),  std::move(eventSender),
                                                std::move(hostResolver), config};

    sendMessagesCommand.execute();

    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

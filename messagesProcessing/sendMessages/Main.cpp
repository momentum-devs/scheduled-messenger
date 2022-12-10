#include <aws/lambda-runtime/runtime.h>

#include "Config.h"
#include "DatabaseConfig.h"
#include "DatabaseConnector.h"
#include "DateServiceImpl.h"
#include "EnvParser.h"
#include "HostResolverImpl.h"
#include "MailioClient.h"
#include "MessageRepositoryImpl.h"
#include "RepeatedByMapperImpl.h"
#include "SendMessagesCommandImpl.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const&)
{
    EnvParser envParser;

    auto dbUsername = envParser.parseString("DB_USERNAME");
    auto dbPassword = envParser.parseString("DB_PASSWORD");
    auto dbHost = envParser.parseString("DB_HOST");
    auto dbPort = envParser.parseString("DB_PORT");
    auto dbName = envParser.parseString("DB_NAME");
    auto timeWindow = envParser.parseInt("TIME_WINDOW");
    auto gmailSmtpHost = envParser.parseString("GMAIL_SMTP_HOST");
    auto gmailSmtpPort = envParser.parseInt("GMAIL_SMTP_PORT");
    auto yahooSmtpHost = envParser.parseString("YAHOO_SMTP_HOST");
    auto yahooSmtpPort = envParser.parseInt("YAHOO_SMTP_PORT");
    auto outlookSmtpHost = envParser.parseString("OUTLOOK_SMTP_HOST");
    auto outlookSmtpPort = envParser.parseInt("OUTLOOK_SMTP_PORT");

    Config config{
        DatabaseConfig{
            dbUsername,
            dbPassword,
            dbHost,
            dbPort,
            dbName,
        },
        timeWindow,
        SmtpHostConfig{gmailSmtpHost, gmailSmtpPort, yahooSmtpHost, yahooSmtpPort, outlookSmtpHost, outlookSmtpPort}};

    std::unique_ptr<DatabaseConnector> databaseConnector = std::make_unique<DatabaseConnector>(config.databaseConfig);
    std::unique_ptr<EmailClient> emailClient = std::make_unique<MailioClient>();
    std::unique_ptr<RepeatedByMapper> repeatedByMapper = std::make_unique<RepeatedByMapperImpl>();
    std::unique_ptr<MessageRepository> messageRepository =
        std::make_unique<MessageRepositoryImpl>(std::move(databaseConnector), std::move(repeatedByMapper));
    std::unique_ptr<DateService> dateService = std::make_unique<DateServiceImpl>();
    std::unique_ptr<HostResolver> hostResolver = std::make_unique<HostResolverImpl>(config.smtpHostConfig);

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClient), std::move(messageRepository),
                                                std::move(dateService), std::move(hostResolver), config.timeWindow};

    sendMessagesCommand.execute();

    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

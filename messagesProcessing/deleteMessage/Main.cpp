#include <aws/lambda-runtime/runtime.h>
#include <memory>

#include "DatabaseConfig.h"
#include "DatabaseConnector.h"
#include "DeleteMessageCommandImpl.h"
#include "MessageRepository.h"
#include "MessageRepositoryImpl.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const&)
{
    const auto dummyId = "dummyId";

    DatabaseConfig databaseConfig{
        std::getenv("DB_USERNAME"), std::getenv("DB_PASSWORD"), std::getenv("DB_HOST"),
        std::getenv("DB_PORT"),     std::getenv("DB_NAME"),
    };
    std::unique_ptr<DatabaseConnector> databaseConnector = std::make_unique<DatabaseConnector>(databaseConfig);
    std::unique_ptr<MessageRepository> messageRepository =
        std::make_unique<MessageRepositoryImpl>(std::move(databaseConnector));

    DeleteMessageCommandImpl deleteMessageCommand{std::move(messageRepository)};
    
    deleteMessageCommand.execute(dummyId);

    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

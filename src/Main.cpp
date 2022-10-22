#include <aws/lambda-runtime/runtime.h>

#include "MailioClient.h"
#include "MessageRepositoryImpl.h"
#include "SendMessagesCommandImpl.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const& request)
{
    std::unique_ptr<EmailClient> emailClient = std::make_unique<MailioClient>();
    std::unique_ptr<MessageRepository> messageRepository = std::make_unique<MessageRepositoryImpl>();

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClient), std::move(messageRepository)};

    sendMessagesCommand.execute();
    
    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

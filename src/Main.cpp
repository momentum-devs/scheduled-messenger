#include <aws/lambda-runtime/runtime.h>

#include "MailioClient.h"

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const& request)
{
    MailioClient emailClient;

    emailClient.sendEmail({{"michalovskyyy@gmail.com", "michal cieslar", "yjakdyridbatyqbn"},
                           {"sektawojciech@gmail.com", "strazak"},
                           "lambda run",
                           "hello from lambda"});

    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);
    
    return 0;
}

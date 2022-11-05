#include <aws/lambda-runtime/runtime.h>

using namespace aws::lambda_runtime;

invocation_response my_handler(invocation_request const&)
{
    return invocation_response::success({R"({"hello": "world"})"}, "application/json");
}

int main()
{
    run_handler(my_handler);

    return 0;
}

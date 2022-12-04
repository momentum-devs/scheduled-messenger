#pragma once

#include <stdexcept>

struct AwsEventSendError : public std::runtime_error
{
    using std::runtime_error::runtime_error;
};

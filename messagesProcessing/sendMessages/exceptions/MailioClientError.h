#pragma once

#include <stdexcept>

struct MailioClientError : public std::runtime_error
{
    using std::runtime_error::runtime_error;
};

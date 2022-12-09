#pragma once

#include <stdexcept>

struct EnvParseError : public std::runtime_error
{
    using std::runtime_error::runtime_error;
};

#pragma once

#include <stdexcept>

struct RepeatedByMappingNotFoundError : public std::runtime_error
{
    using std::runtime_error::runtime_error;
};

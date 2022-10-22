#pragma once

#include <stdexcept>

struct EmailRequiredFieldsNotProvidedError : public std::runtime_error
{
    using std::runtime_error::runtime_error;
};

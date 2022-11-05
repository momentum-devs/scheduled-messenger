#pragma once

#include <optional>
#include <string>

#include "RepeatedBy.h"

class RepeatedByMapper
{
public:
    virtual ~RepeatedByMapper() = default;

    virtual RepeatedBy map(const std::optional<std::string>& repeatedByStr) const = 0;
};
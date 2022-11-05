#pragma once

#include <unordered_map>

#include "RepeatedByMapper.h"

class RepeatedByMapperImpl : public RepeatedByMapper
{
public:
    RepeatedBy map(const std::optional<std::string>& repeatedByStr) const override;
};
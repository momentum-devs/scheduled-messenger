#pragma once

#include <string>
#include <tuple>

#include "RepeatedBy.h"

struct IsDateWithinRecurringTimePeriodPayload
{
    std::string date;
    std::string startDate;
    RepeatedBy repeatedBy;
    int timeWindow;
};

inline bool operator==(const IsDateWithinRecurringTimePeriodPayload& lhs,
                       const IsDateWithinRecurringTimePeriodPayload& rhs)
{
    auto tieStruct = [](const IsDateWithinRecurringTimePeriodPayload& payload)
    { return std::tie(payload.date, payload.startDate, payload.repeatedBy, payload.timeWindow); };
    return tieStruct(lhs) == tieStruct(rhs);
}
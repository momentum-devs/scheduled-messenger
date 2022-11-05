#pragma once

#include <string>
#include <tuple>

#include "IsDateWithinRecurringTimePeriodPayload.h"

class DateService
{
public:
    virtual ~DateService() = default;

    virtual bool isDateWithinRecurringTimePeriod(IsDateWithinRecurringTimePeriodPayload payload) = 0;
    virtual std::string getCurrentDate() = 0;
};
#pragma once

#include <string>

#include "IsDateWithinRecurringTimePeriodPayload.h"

class DateService
{
public:
    virtual ~DateService() = default;

    virtual bool isDateWithinRecurringTimePeriod(const IsDateWithinRecurringTimePeriodPayload& payload) const = 0;
    virtual std::string getCurrentDate() const = 0;
};
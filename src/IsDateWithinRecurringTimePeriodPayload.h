#pragma once

#include <string>

#include "RepeatedBy.h"

struct IsDateWithinRecurringTimePeriodPayload
{
    std::string date;
    std::string startDate;
    RepeatedBy repeatedBy;
    int timeWindow;
};
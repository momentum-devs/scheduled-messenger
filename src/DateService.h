#pragma once

#include <string>
#include <tuple>

#include "IsDateWithinRecurringTimePeriodPayload.h"

class DateService
{
public:
    DateService();

    bool isDateWithinRecurringTimePeriod(IsDateWithinRecurringTimePeriodPayload payload);

private:
    std::tuple<int, int, int, int, int> convertDateStringToTuple(std::string date);
    bool isTimeFromTimeWindow(std::tuple<int, int> time, std::tuple<int, int> startTime, int timeWindow);
};
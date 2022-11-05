#pragma once

#include "DateService.h"

class DateServiceImpl : public DateService
{
public:
    DateServiceImpl();

    bool isDateWithinRecurringTimePeriod(IsDateWithinRecurringTimePeriodPayload payload) override;
    std::string getCurrentDate() override;

private:
    std::tuple<int, int, int, int, int> convertDateStringToTuple(std::string date);
    bool isTimeFromTimeWindow(std::tuple<int, int> time, std::tuple<int, int> startTime, int timeWindow);
};
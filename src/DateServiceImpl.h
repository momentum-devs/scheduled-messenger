#pragma once

#include "DateService.h"
#include "DateTime.h"

class DateServiceImpl : public DateService
{
public:
    bool isDateWithinRecurringTimePeriod(const IsDateWithinRecurringTimePeriodPayload& payload) const override;
    std::string getCurrentDate() const override;

private:
    DateTime convertDateStringToDateTime(std::string date) const;
    bool isTimeFromTimeWindow(const Time& time, const Time& startTime, int timeWindow) const;
};
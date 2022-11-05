#pragma once

#include "gmock/gmock.h"

#include "DateService.h"

class DateServiceMock : public DateService
{
public:
    MOCK_METHOD(bool, isDateWithinRecurringTimePeriod, (const IsDateWithinRecurringTimePeriodPayload&),
                (const override));
    MOCK_METHOD(std::string, getCurrentDate, (), (const override));
};
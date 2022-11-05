#include "DateService.h"

#include "gtest/gtest.h"

#include "IsDateWithinRecurringTimePeriodPayload.h"

class DataServiceTest : public testing::Test
{
public:
    DateService dateService;
};

TEST_F(DataServiceTest, giveSameDatesAndSameTimeWithNoneRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-05 12:00", "2022-11-05 12:00", RepeatedBy::NONE, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveSameDatesAndTimeFromWindowWithNoneRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-05 11:57", "2022-11-05 12:00", RepeatedBy::NONE, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesAndTimeFromWindowWithNoneRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-04 23:57", "2022-11-05 00:00", RepeatedBy::NONE, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesByDayButMonthChangeAndTimeFromWindowWithNoneRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-31 23:57", "2022-11-01 00:00", RepeatedBy::NONE, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesByDayButYearChangeAndTimeFromWindowWithNoneRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2021-12-31 23:57", "2022-01-01 00:00", RepeatedBy::NONE, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesAndTimeFromWindowWithNoneRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-04 12:00", "2022-11-05 12:00", RepeatedBy::NONE, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveSameDatesAndTimeOutFromWindowWithNoneRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-05 6:00", "2022-11-05 12:00", RepeatedBy::NONE, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesAndTimeFromWindowWithDayRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-04 11:57", "2022-11-05 12:00", RepeatedBy::DAY, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDifferentDatesAndTimeOutFromWindowWithDayRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-04 10:57", "2022-11-05 12:00", RepeatedBy::DAY, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByMonthAndTimeFromWindowWithMonthRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-05 11:57", "2022-11-05 12:00", RepeatedBy::MONTH, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByMonthAndOneAndTimeFromWindowWithMonthRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-04 23:57", "2022-11-05 00:00", RepeatedBy::MONTH, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByMonthAndTimeOutFromWindowWithMonthRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-05 10:57", "2022-11-05 12:00", RepeatedBy::MONTH, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByDayOfMonthAndTimeFromWindowWithMonthRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-04 11:57", "2022-11-05 12:00", RepeatedBy::MONTH, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByYearAndTimeFromWindowWithYearRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2021-11-05 11:57", "2022-11-05 12:00", RepeatedBy::YEAR, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByYearAndOneDayAndTimeFromWindowWithYearRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2021-11-04 23:57", "2022-11-05 00:00", RepeatedBy::YEAR, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByMonthAndTimeFromWindowWithYearRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-05 11:57", "2022-11-05 12:00", RepeatedBy::YEAR, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByDayOfMonthAndTimeFromWindowWithYearRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-03 11:57", "2022-11-05 12:00", RepeatedBy::YEAR, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByYearAndTimeOutFromWindowWithYearRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2021-11-05 10:57", "2022-11-05 12:00", RepeatedBy::YEAR, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByWeekAndTimeFromWindowWithWeekRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-29 11:57", "2022-11-05 12:00", RepeatedBy::WEEK, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByWeekAndOneDayAndTimeFromWindowWithWeekRepeat_shouldReturnTrue)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-10-28 23:57", "2022-11-05 00:00", RepeatedBy::WEEK, 5};

    ASSERT_TRUE(dateService.isDateWithinRecurringTimePeriod(payload));
}

TEST_F(DataServiceTest, giveDatesDifferentByDayAndTimeFromWindowWithWeekRepeat_shouldReturnFalse)
{
    IsDateWithinRecurringTimePeriodPayload payload{"2022-11-04 11:57", "2022-11-05 12:00", RepeatedBy::WEEK, 5};

    ASSERT_FALSE(dateService.isDateWithinRecurringTimePeriod(payload));
}

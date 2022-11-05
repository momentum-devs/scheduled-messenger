#include "DateServiceImpl.h"

#include <boost/algorithm/string/replace.hpp>
#include <boost/date_time.hpp>

#include "fmt/format.h"

bool DateServiceImpl::isDateWithinRecurringTimePeriod(const IsDateWithinRecurringTimePeriodPayload& payload) const
{
    auto [year, month, day, hour, minute] = convertDateStringToDateTime(payload.date);

    auto [startYear, startMonth, startDay, startHour, startMinute] = convertDateStringToDateTime(payload.startDate);

    if (!isTimeFromTimeWindow({hour, minute}, {startHour, startMinute}, payload.timeWindow))
    {
        return false;
    }

    if (hour == 23 && minute + payload.timeWindow > 60)
    {
        boost::gregorian::date date{year, month, day};

        date += boost::gregorian::days{1};

        year = date.year();
        month = date.month();
        day = date.day();
    }

    if (payload.repeatedBy == RepeatedBy::DAY)
    {
        return true;
    }

    if (payload.repeatedBy == RepeatedBy::MONTH)
    {
        return startDay == day;
    }

    if (payload.repeatedBy == RepeatedBy::YEAR)
    {
        return startDay == day && startMonth == month;
    }

    if (payload.repeatedBy == RepeatedBy::NONE)
    {
        return startDay == day && startMonth == month && startYear == year;
    }

    if (payload.repeatedBy == RepeatedBy::WEEK)
    {
        boost::gregorian::date startDate{startYear, startMonth, startDay};
        boost::gregorian::date date{year, month, day};

        return startDate.day_of_week() == date.day_of_week();
    }

    return false;
}

DateTime DateServiceImpl::convertDateStringToDateTime(std::string date) const
{
    DateTime dateTime{};

    boost::replace_all(date, "-", " ");
    boost::replace_all(date, ":", " ");

    std::stringstream dateStream{date};

    dateStream >> dateTime.year >> dateTime.month >> dateTime.day >> dateTime.hour >> dateTime.minute;

    return dateTime;
}

bool DateServiceImpl::isTimeFromTimeWindow(const Time& time, const Time& startTime, int timeWindow) const
{
    auto [hour, minute] = time;
    auto [startHour, startMinute] = startTime;

    if (startHour == hour and minute > startMinute - timeWindow and startMinute <= minute)
    {
        return true;
    }

    bool areHoursDifferentByOne = startHour - 1 == hour;
    bool areHoursDifferentByOneAndDateChange = startHour == 0 && hour == 23;
    if ((areHoursDifferentByOne or areHoursDifferentByOneAndDateChange) and minute - startMinute > 60 - timeWindow and
        minute - startMinute <= 60)
    {
        return true;
    }

    return false;
}

std::string DateServiceImpl::getCurrentDate() const
{
    boost::posix_time::ptime timeLocal = boost::posix_time::second_clock::local_time();

    return fmt::format("{}-{}-{} {}:{}", timeLocal.date().year(), timeLocal.date().month(), timeLocal.date().day(),
                       timeLocal.time_of_day().hours(), timeLocal.time_of_day().minutes());
}

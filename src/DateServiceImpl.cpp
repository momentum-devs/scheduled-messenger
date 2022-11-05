#include "DateServiceImpl.h"

#include <boost/algorithm/string/replace.hpp>
#include <boost/date_time.hpp>
#include <sstream>

#include "fmt/format.h"

DateServiceImpl::DateServiceImpl() {}

bool DateServiceImpl::isDateWithinRecurringTimePeriod(IsDateWithinRecurringTimePeriodPayload payload)
{
    auto [year, month, day, hour, minute] = convertDateStringToTuple(payload.date);
    auto [startYear, startMonth, startDay, startHour, startMinute] = convertDateStringToTuple(payload.startDate);
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

std::tuple<int, int, int, int, int> DateServiceImpl::convertDateStringToTuple(std::string date)
{
    int year;
    int month;
    int day;
    int hour;
    int minute;
    boost::replace_all(date, "-", " ");
    boost::replace_all(date, ":", " ");
    std::stringstream dateStream{date};
    dateStream >> year >> month >> day >> hour >> minute;
    return {abs(year), abs(month), abs(day), abs(hour), abs(minute)};
}

bool DateServiceImpl::isTimeFromTimeWindow(std::tuple<int, int> time, std::tuple<int, int> startTime, int timeWindow)
{
    auto [hour, minute] = time;
    auto [startHour, startMinute] = startTime;

    if (startHour == hour && minute > startMinute - timeWindow && startMinute <= minute)
    {
        return true;
    }
    if (((startHour - 1 == hour) || (startHour == 0 && hour == 23)) && minute - startMinute > 60 - timeWindow &&
        minute - startMinute <= 60)
    {
        return true;
    }

    return false;
}
std::string DateServiceImpl::getCurrentDate()
{
    boost::posix_time::ptime timeLocal = boost::posix_time::second_clock::local_time();
    return fmt::format("{}-{}-{} {}:{}", timeLocal.date().year(), timeLocal.date().month(), timeLocal.date().day(),
                       timeLocal.time_of_day().hours(), timeLocal.time_of_day().minutes());
}
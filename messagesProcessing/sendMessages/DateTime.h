#pragma once

#include <ostream>

struct DateTime
{
    int year;
    int month;
    int day;
    int hour;
    int minute;
};

inline std::ostream& operator<<(std::ostream& os, const DateTime& dateTime)
{
    return os << "year: " << dateTime.year << " month: " << dateTime.month << " day: " << dateTime.day
              << " hour: " << dateTime.hour << " minute: " << dateTime.minute;
}

inline bool operator==(const DateTime& lhs, const DateTime& rhs)
{
    auto tieStruct = [](const DateTime& dateTime)
    { return std::tie(dateTime.year, dateTime.month, dateTime.day, dateTime.hour, dateTime.minute); };
    return tieStruct(lhs) == tieStruct(rhs);
}

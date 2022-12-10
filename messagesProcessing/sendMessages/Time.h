#pragma once

#include <ostream>

struct Time
{
    int hour;
    int minute;
};

inline std::ostream& operator<<(std::ostream& os, const Time& time)
{
    return os << "hour: " << time.hour << " minute: " << time.minute;
}

inline bool operator==(const Time& lhs, const Time& rhs)
{
    return (lhs.hour == rhs.hour) and (lhs.minute == rhs.minute);
}

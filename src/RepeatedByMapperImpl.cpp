#include "RepeatedByMapperImpl.h"

#include "exceptions/RepeatedByMappingNotFoundError.h"
#include "fmt/core.h"

namespace
{
std::unordered_map<std::optional<std::string>, RepeatedBy> repeatedByMapping{
    {"DAY", RepeatedBy::DAY},   {"WEEK", RepeatedBy::WEEK},       {"MONTH", RepeatedBy::MONTH},
    {"YEAR", RepeatedBy::YEAR}, {std::nullopt, RepeatedBy::NONE},
};
}

RepeatedBy RepeatedByMapperImpl::map(std::optional<std::string> repeatedByStr) const
{
    try
    {
        return repeatedByMapping.at(repeatedByStr);
    }
    catch (const std::exception& e)
    {
        throw RepeatedByMappingNotFoundError{fmt::format("Mapping for {} not found", repeatedByStr.value())};
    }
}

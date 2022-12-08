#include "HostResolverImpl.h"

#include <boost/algorithm/string.hpp>
#include <vector>

const int HostResolverImpl::defaultPort = 587;

Endpoint HostResolverImpl::resolve(const std::string& emailAddress)
{
    std::vector<std::string> splitEmailAddress;
    boost::split(splitEmailAddress, emailAddress, boost::is_any_of("@"));
    return {"smtp." + splitEmailAddress[1], defaultPort};
}

#include "HostResolverImpl.h"

#include <boost/algorithm/string.hpp>
#include <vector>

const int HostResolverImpl::defaultPort = 587;

namespace
{
std::unordered_map<std::string, std::string> smtpHostMapping{
    {"gmail.com", "smtp.gmail.com"}, {"yahoo.com", "smtp.mail.yahoo.com"}, {"outlook.com", "smtp-mail.outlook.com"}};
}

Endpoint HostResolverImpl::resolve(const std::string& emailAddress)
{
    std::vector<std::string> splitEmailAddress;
    boost::split(splitEmailAddress, emailAddress, boost::is_any_of("@"));
    auto smtpHost = smtpHostMapping[splitEmailAddress[1]];
    return {smtpHost, defaultPort};
}

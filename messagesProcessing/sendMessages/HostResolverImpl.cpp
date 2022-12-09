#include "HostResolverImpl.h"

#include <boost/algorithm/string.hpp>
#include <vector>

HostResolverImpl::HostResolverImpl(const Config& config)
{
    const auto& hostConfig = config.smtpHostConfig;
    int gmailPort;
    int yahooPort;
    int outlookPort;
    std::stringstream{hostConfig.gmailSmtpPort} >> gmailPort;
    std::stringstream{hostConfig.yahooSmtpPort} >> yahooPort;
    std::stringstream{hostConfig.outlookSmtpPort} >> outlookPort;
    smtpHostMapping = {
        {"gmail.com", {hostConfig.gmailSmtpHost, gmailPort}},
        {"yahoo.com", {hostConfig.yahooSmtpHost, yahooPort}},
        {"outlook.com", {hostConfig.outlookSmtpHost, outlookPort}},
    };
}

Endpoint HostResolverImpl::resolve(const std::string& emailAddress)
{
    std::vector<std::string> splitEmailAddress;
    boost::split(splitEmailAddress, emailAddress, boost::is_any_of("@"));
    auto endpoint = smtpHostMapping[splitEmailAddress[1]];
    return endpoint;
}

#include "HostResolverImpl.h"

#include <boost/algorithm/string.hpp>
#include <vector>

HostResolverImpl::HostResolverImpl(const SmtpHostConfig& config)
    : smtpHostMapping{
          {"gmail.com", {config.gmailSmtpHost, config.gmailSmtpPort}},
          {"yahoo.com", {config.yahooSmtpHost, config.yahooSmtpPort}},
          {"outlook.com", {config.outlookSmtpHost, config.outlookSmtpPort}},
      }
{
}

Endpoint HostResolverImpl::resolve(const std::string& emailAddress)
{
    std::vector<std::string> splitEmailAddress;

    boost::split(splitEmailAddress, emailAddress, boost::is_any_of("@"));

    auto endpoint = smtpHostMapping.at(splitEmailAddress[1]);

    return endpoint;
}

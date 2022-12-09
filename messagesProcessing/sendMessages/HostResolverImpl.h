#pragma once

#include <unordered_map>

#include "Config.h"
#include "HostResolver.h"

class HostResolverImpl : public HostResolver
{
public:
    HostResolverImpl(const Config&);
    Endpoint resolve(const std::string& emailAddress) override;

private:
    std::unordered_map<std::string, Endpoint> smtpHostMapping;
};

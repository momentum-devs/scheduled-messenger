#pragma once

#include "HostResolver.h"

class HostResolverImpl : public HostResolver
{
public:
    Endpoint resolve(const std::string& emailAddress) override;

private:
    static const int defaultPort;
};

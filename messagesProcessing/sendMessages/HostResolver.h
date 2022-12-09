#pragma once

#include "Endpoint.h"

class HostResolver
{
public:
    virtual ~HostResolver() = default;
    
    virtual Endpoint resolve(const std::string& emailAddress) = 0;
};

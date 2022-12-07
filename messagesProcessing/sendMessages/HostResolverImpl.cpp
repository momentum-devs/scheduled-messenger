#include "HostResolverImpl.h"

const int HostResolverImpl::defaultPort = 587;

Endpoint HostResolverImpl::resolve(const std::string& emailAddress)
{
    
    return {"smtp.gmail.com", defaultPort};
}

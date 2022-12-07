#pragma once

#include "gmock/gmock.h"

#include "HostResolver.h"

class HostResolverMock : public HostResolver
{
public:
    MOCK_METHOD(Endpoint, resolve, (const std::string&), (override));
};

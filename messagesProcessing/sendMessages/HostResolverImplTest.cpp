#include "HostResolverImpl.h"

#include "gtest/gtest.h"

namespace
{
std::string gmailEmailAddress{"email@gmail.com"};
Endpoint gmailEndpoint{"smtp.gmail.com", 587};

std::string yahooEmailAddress{"email@yahoo.com"};
Endpoint yahooEndpoint{"smtp.yahoo.com", 587};

std::string protonEmailAddress{"email@proton.me"};
Endpoint protonEndpoint{"smtp.proton.me", 587};
}

class HostResolverTest : public testing::Test
{
public:
    HostResolverImpl hostResolver;
};

TEST_F(HostResolverTest, resloveGmailHost)
{
    auto result = hostResolver.resolve(gmailEmailAddress);

    ASSERT_EQ(result, gmailEndpoint);
}

TEST_F(HostResolverTest, resloveYahooHost)
{
    auto result = hostResolver.resolve(yahooEmailAddress);

    ASSERT_EQ(result, yahooEndpoint);
}

TEST_F(HostResolverTest, resloveProtonHost)
{
    auto result = hostResolver.resolve(protonEmailAddress);

    ASSERT_EQ(result, protonEndpoint);
}
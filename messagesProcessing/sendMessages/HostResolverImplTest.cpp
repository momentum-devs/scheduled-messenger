#include "HostResolverImpl.h"

#include "gtest/gtest.h"

namespace
{
std::string gmailEmailAddress{"email@gmail.com"};
Endpoint gmailEndpoint{"smtp.gmail.com", 587};

std::string yahooEmailAddress{"email@yahoo.com"};
Endpoint yahooEndpoint{"smtp.mail.yahoo.com", 587};

std::string outlookEmailAddress{"email@outlook.com"};
Endpoint outlookEndpoint{"smtp-mail.outlook.com", 587};

SmtpHostConfig config{gmailEndpoint.address, "587", yahooEndpoint.address, "587", outlookEndpoint.address, "587"};
}

class HostResolverTest : public testing::Test
{
public:
    HostResolverImpl hostResolver{config};
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

TEST_F(HostResolverTest, resloveOutlookHost)
{
    auto result = hostResolver.resolve(outlookEmailAddress);

    ASSERT_EQ(result, outlookEndpoint);
}

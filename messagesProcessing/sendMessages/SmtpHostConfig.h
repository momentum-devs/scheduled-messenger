#pragma once

#include <string>

struct SmtpHostConfig
{
    std::string gmailSmtpHost;
    int gmailSmtpPort;
    std::string yahooSmtpHost;
    int yahooSmtpPort;
    std::string outlookSmtpHost;
    int outlookSmtpPort;
};

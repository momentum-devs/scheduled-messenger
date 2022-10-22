#pragma once

#include "MailClient.h"

class MailioClient: public MailClient
{
public:
    void sendEmail(const SendEmailPayload& payload) const override;

private:
    static const int smtpPort;
    static const std::string smtpAddress;
};

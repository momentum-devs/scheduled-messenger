#pragma once

#include "EmailClient.h"

class MailioClient : public EmailClient
{
public:
    void sendEmail(const SendEmailPayload& payload) const override;
};

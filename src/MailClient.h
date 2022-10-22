#pragma once

#include "SendEmailPayload.h"

class MailClient{
public:
    virtual ~MailClient() = default;

    virtual void sendEmail(const SendEmailPayload& payload) const = 0;
};

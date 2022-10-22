#pragma once

#include "SendEmailPayload.h"

class EmailClient
{
public:
    virtual ~EmailClient() = default;

    virtual void sendEmail(const SendEmailPayload& payload) const = 0;
};

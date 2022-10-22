#pragma once

#include "MailClient.h"

#include "gmock/gmock.h"

class MailClientMock: public MailClient
{
public:
    MOCK_METHOD(void, sendEmail, (const SendEmailPayload&), (const override));
};
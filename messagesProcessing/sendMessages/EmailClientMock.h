#pragma once

#include "gmock/gmock.h"

#include "EmailClient.h"

class EmailClientMock : public EmailClient
{
public:
    MOCK_METHOD(void, sendEmail, (const SendEmailPayload&), (const override));
};
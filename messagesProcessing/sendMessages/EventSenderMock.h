#pragma once

#include "gmock/gmock.h"

#include "EventSender.h"

class EventSenderMock : public EventSender
{
public:
    MOCK_METHOD(void, sendEvent, (const SendEventPayload&), (override));
};

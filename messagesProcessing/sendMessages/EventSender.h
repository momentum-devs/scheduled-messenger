#pragma once

#include "SendEventPayload.h"

class EventSender
{
public:
    virtual ~EventSender() = default;
    virtual void sendEvent(const SendEventPayload& payload) = 0;
};
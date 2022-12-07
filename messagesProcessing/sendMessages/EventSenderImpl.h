#pragma once

#include "EventSender.h"

class EventSenderImpl : public EventSender
{
public:
    void sendEvent(const SendEventPayload& payload) override;
};
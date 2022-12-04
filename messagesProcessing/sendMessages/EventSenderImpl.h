#pragma once

#include "EventSender.h"

class EventSenderImpl : public EventSender
{
public:
    void sendDeleteRecordEvent(SendEventPayload payload) override;
};
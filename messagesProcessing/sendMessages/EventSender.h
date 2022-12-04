#pragma once

#include "SendEventPayload.h"

class EventSender
{
public:
    virtual void sendDeleteRecordEvent(SendEventPayload payload) = 0;
};
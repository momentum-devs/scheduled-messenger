#pragma once

#include <string>
#include <tuple>

#include "EmailReceiver.h"
#include "EmailSender.h"
#include "Endpoint.h"

struct SendEmailPayload
{
    EmailSender sender;
    EmailReceiver receiver;
    std::string title;
    std::string message;
    Endpoint endpoint;
};

inline std::ostream& operator<<(std::ostream& os, const SendEmailPayload& sendEmailPayload)
{
    return os << "sender: {" << sendEmailPayload.sender << "} receiver: {" << sendEmailPayload.receiver
              << "} title: " << sendEmailPayload.title << " message: " << sendEmailPayload.message
              << " endpoint: " << sendEmailPayload.endpoint;
}

inline bool operator==(const SendEmailPayload& lhs, const SendEmailPayload& rhs)
{
    auto tieStruct = [](const SendEmailPayload& payload)
    { return std::tie(payload.title, payload.message, payload.sender, payload.receiver, payload.endpoint); };
    return tieStruct(lhs) == tieStruct(rhs);
}

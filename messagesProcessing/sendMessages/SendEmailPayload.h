#pragma once

#include <string>
#include <tuple>

#include "Endpoint.h"

struct EmailSender
{
    std::string address;
    std::string name;
    std::string password;
};

struct EmailReceiver
{
    std::string address;
    std::string name;
};

struct SendEmailPayload
{
    EmailSender sender;
    EmailReceiver receiver;
    std::string title;
    std::string message;
    Endpoint endpoint;
};

inline bool operator==(const SendEmailPayload& lhs, const SendEmailPayload& rhs)
{
    auto tieStruct = [](const SendEmailPayload& payload)
    {
        return std::tie(payload.title, payload.message, payload.sender.address, payload.sender.name,
                        payload.sender.password, payload.receiver.address, payload.receiver.name, payload.endpoint);
    };
    return tieStruct(lhs) == tieStruct(rhs);
}
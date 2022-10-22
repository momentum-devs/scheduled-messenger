#pragma once

#include <string>

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
};

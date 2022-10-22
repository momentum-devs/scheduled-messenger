#include "MailioClient.h"
#include "exceptions/MailioClientError.h"

#include <mailio/message.hpp>
#include <mailio/smtp.hpp>

const int MailioClient::smtpPort = 587;
const std::string MailioClient::smtpAddress = "smtp.gmail.com";

void MailioClient::sendEmail(const SendEmailPayload& payload) const
{
    try
    {
        mailio::message message;

        message.from(mailio::mail_address(payload.sender.name, payload.sender.address));
        message.add_recipient(mailio::mail_address(payload.receiver.name, payload.receiver.address));
        message.subject(payload.title);
        message.content(payload.message);

        mailio::smtps connection(smtpAddress, smtpPort);
        
        connection.authenticate(payload.sender.address, payload.sender.password, mailio::smtps::auth_method_t::START_TLS);
        connection.submit(message);
    }
    catch(const std::exception& e)
    {
        throw MailioClientError{e.what()};
    }
}

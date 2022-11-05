#include "SendMessagesCommandImpl.h"

#include "gmock/gmock.h"
#include "gtest/gtest.h"

#include "DateServiceMock.h"
#include "EmailClientMock.h"
#include "MessageRepositoryMock.h"

using namespace ::testing;

namespace
{
std::string startDate{"startDate"};
::Message message{"id", "text", "title", "sendDate", RepeatedBy::NONE, "displayName", {}, {}};
std::vector<::Message> messages{message};
EmailSender emailSender{message.user.emailAddress, message.displayName, message.user.emailPassword};
EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};
SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text};
IsDateWithinRecurringTimePeriodPayload isDateWithinRecurringTimePeriodPayloadInit{message.sendDate, startDate,
                                                                                  message.repeatBy, 5};
std::vector<::Message> emptyMessagesVector{};
}

class SendMessagesCommandImplTest : public testing::Test
{
public:
    std::unique_ptr<EmailClientMock> emailClientInit{std::make_unique<EmailClientMock>()};
    EmailClientMock* emailClient{emailClientInit.get()};

    std::unique_ptr<MessageRepositoryMock> messageRepositoryInit{std::make_unique<MessageRepositoryMock>()};
    MessageRepositoryMock* messageRepository{messageRepositoryInit.get()};

    std::unique_ptr<DateServiceMock> dateServiceInit{std::make_unique<DateServiceMock>()};
    DateServiceMock* dateService{dateServiceInit.get()};

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClientInit), std::move(messageRepositoryInit),
                                                std::move(dateServiceInit)};
};

TEST_F(SendMessagesCommandImplTest, executeCommand)
{
    EXPECT_CALL(*dateService, getCurrentDate()).WillOnce(Return(startDate));
    EXPECT_CALL(*messageRepository, findMany()).WillOnce(Return(messages));
    EXPECT_CALL(*dateService, isDateWithinRecurringTimePeriod(isDateWithinRecurringTimePeriodPayloadInit))
        .WillOnce(Return(true));
    EXPECT_CALL(*emailClient, sendEmail(emailPayload));

    sendMessagesCommand.execute();
}

TEST_F(SendMessagesCommandImplTest, executeCommandWithDateOutOfRecurringTimePeriod)
{
    EXPECT_CALL(*dateService, getCurrentDate()).WillOnce(Return(startDate));
    EXPECT_CALL(*messageRepository, findMany()).WillOnce(Return(messages));
    EXPECT_CALL(*dateService, isDateWithinRecurringTimePeriod(isDateWithinRecurringTimePeriodPayloadInit))
        .WillOnce(Return(false));

    sendMessagesCommand.execute();
}

TEST_F(SendMessagesCommandImplTest, executeCommandWithoutAnyMessage)
{
    EXPECT_CALL(*dateService, getCurrentDate()).WillOnce(Return(startDate));
    EXPECT_CALL(*messageRepository, findMany()).WillOnce(Return(emptyMessagesVector));

    sendMessagesCommand.execute();
}
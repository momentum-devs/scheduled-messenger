#include "SendMessagesCommandImpl.h"

#include "gmock/gmock.h"
#include "gtest/gtest.h"

#include "DateServiceMock.h"
#include "EmailClientMock.h"
#include "EventSenderMock.h"
#include "MessageRepositoryMock.h"

using namespace ::testing;

namespace
{
std::string startDate{"startDate"};
std::unique_ptr<Config> config{std::make_unique<Config>(DatabaseConfig{}, "resourceArn")};
::Message message{"id", "text", "title", "sendDate", RepeatedBy::DAY, "displayName", {}, {}};
::Message messageNonRepeated{"id", "text", "title", "sendDate", RepeatedBy::NONE, "displayName", {}, {}};
std::vector<::Message> messages{message};
std::vector<::Message> messagesNonRepeated{messageNonRepeated};
EmailSender emailSender{message.user.emailAddress, message.displayName, message.user.emailPassword};
EmailReceiver emailReceiver{message.recipient.emailAddress, message.recipient.name};
SendEmailPayload emailPayload{emailSender, emailReceiver, message.title, message.text, {}};
IsDateWithinRecurringTimePeriodPayload isDateWithinRecurringTimePeriodPayloadInit{message.sendDate, startDate,
                                                                                  message.repeatBy, 5};
IsDateWithinRecurringTimePeriodPayload isDateWithinRecurringTimePeriodPayloadNonRecurringInit{
    messageNonRepeated.sendDate, startDate, messageNonRepeated.repeatBy, 5};
std::vector<::Message> emptyMessagesVector{};
std::vector<::Message> multipleMessages(100, message);
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

    std::unique_ptr<EventSenderMock> eventSenderInit{std::make_unique<EventSenderMock>()};
    EventSenderMock* eventSender{eventSenderInit.get()};

    SendMessagesCommandImpl sendMessagesCommand{std::move(emailClientInit), std::move(messageRepositoryInit),
                                                std::move(dateServiceInit), std::move(eventSenderInit), config};
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

TEST_F(SendMessagesCommandImplTest, executeCommandWithNonRepeatedMessage_shouldSendEvent)
{
    EXPECT_CALL(*dateService, getCurrentDate()).WillOnce(Return(startDate));
    EXPECT_CALL(*messageRepository, findMany()).WillOnce(Return(messagesNonRepeated));
    EXPECT_CALL(*dateService, isDateWithinRecurringTimePeriod(isDateWithinRecurringTimePeriodPayloadNonRecurringInit))
        .WillOnce(Return(true));
    EXPECT_CALL(*emailClient, sendEmail(emailPayload));
    EXPECT_CALL(*eventSender, sendDeleteRecordEvent(_));

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

TEST_F(SendMessagesCommandImplTest, executeCommandWithMultipleMessages)
{
    EXPECT_CALL(*dateService, getCurrentDate()).WillOnce(Return(startDate));
    EXPECT_CALL(*messageRepository, findMany()).WillOnce(Return(multipleMessages));
    EXPECT_CALL(*dateService, isDateWithinRecurringTimePeriod(isDateWithinRecurringTimePeriodPayloadInit))
        .Times(100)
        .WillRepeatedly(Return(true));
    EXPECT_CALL(*emailClient, sendEmail(emailPayload)).Times(100);

    sendMessagesCommand.execute();
}
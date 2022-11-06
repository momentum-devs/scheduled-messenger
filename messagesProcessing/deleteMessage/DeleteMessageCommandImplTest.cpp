#include "gmock/gmock.h"
#include "gtest/gtest.h"

#include "MessageRepositoryMock.h"

#include "DeleteMessageCommandImpl.h"

using namespace ::testing;

class DeleteMessageCommandImplTest : public testing::Test
{
public:
    std::unique_ptr<MessageRepositoryMock> messageRepositoryInit{std::make_unique<MessageRepositoryMock>()};
    MessageRepositoryMock* messageRepository{messageRepositoryInit.get()};

    DeleteMessageCommandImpl deleteMessageCommand{std::move(messageRepositoryInit)};
};

TEST_F(DeleteMessageCommandImplTest, executeCommand)
{
    const auto messageId = "messageId";

    EXPECT_CALL(*messageRepository, deleteOne(messageId));

    deleteMessageCommand.execute(messageId);
}

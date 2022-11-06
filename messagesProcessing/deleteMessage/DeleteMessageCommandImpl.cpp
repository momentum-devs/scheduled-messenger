#include "DeleteMessageCommandImpl.h"

DeleteMessageCommandImpl::DeleteMessageCommandImpl(std::unique_ptr<MessageRepository> messageRepositoryInit)
    : messageRepository{std::move(messageRepositoryInit)}
{
}

void DeleteMessageCommandImpl::execute(const std::string& messageId) const
{
    messageRepository->deleteOne(messageId);
}

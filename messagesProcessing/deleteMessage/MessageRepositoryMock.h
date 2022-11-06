#pragma once

#include "gmock/gmock.h"

#include "MessageRepository.h"

class MessageRepositoryMock : public MessageRepository
{
public:
    MOCK_METHOD(void, deleteOne, (const std::string& messageId), (override));
};

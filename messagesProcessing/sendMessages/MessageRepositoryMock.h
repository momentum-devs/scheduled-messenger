#pragma once

#include "gmock/gmock.h"

#include "MessageRepository.h"

class MessageRepositoryMock : public MessageRepository
{
public:
    MOCK_METHOD(std::vector<Message>, findMany, (), (override));
    MOCK_METHOD(void, deleteOne, (const std::string& id), (override));
};

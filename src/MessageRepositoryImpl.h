#pragma once

#include <memory>
#include <tao/pq.hpp>

#include "MessageRepository.h"

class MessageRepositoryImpl : public MessageRepository
{
public:
    std::vector<Message> findMany() const override;

private:
    std::shared_ptr<tao::pq::connection> getConnection() const;
};

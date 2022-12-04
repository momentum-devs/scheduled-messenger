#pragma once

#include <memory>
#include <tao/pq.hpp>

#include "Config.h"

class DatabaseConnector
{
public:
    explicit DatabaseConnector(const std::unique_ptr<Config>&);

    std::shared_ptr<tao::pq::connection> getConnection();

private:
    std::shared_ptr<tao::pq::connection> connection;
    const std::unique_ptr<Config>& config;
};

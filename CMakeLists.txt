cmake_minimum_required(VERSION 3.12)

set(PROJECT_NAME scheduled-messenger)
project(${PROJECT_NAME} CXX)

add_subdirectory(externals)

find_package(aws-lambda-runtime REQUIRED)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_FLAGS_DEBUG)

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++20 -Wall -Wextra")

set(GMOCK_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/externals/googletest/googlemock/include")
set(GTEST_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/externals/googletest/googletest/include")
set(AWS_LAMBDA_CPP_INCLUDE_DIR "${CMAKE_SOURCE_DIR}/externals/aws-lambda-cpp/include")

enable_testing()

add_subdirectory(messagesProcessing)

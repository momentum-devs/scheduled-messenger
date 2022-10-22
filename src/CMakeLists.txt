set(SOURCES
        main.cpp
        MailioClient.cpp
        EmailClientMock.h)

add_executable(scheduled-messenger ${SOURCES})

target_link_libraries(scheduled-messenger PUBLIC mailio cpr fmt taopq gtest gmock_main AWS::aws-lambda-runtime)

target_include_directories(scheduled-messenger PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

aws_lambda_package_target(scheduled-messenger)

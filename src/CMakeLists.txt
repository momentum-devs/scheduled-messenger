set(SOURCES
        Main.cpp
        MailioClient.cpp
        MessageRepositoryImpl.cpp
        SendMessagesCommandImpl.cpp
        )

add_executable(send-emails-lambda-handler ${SOURCES})

target_link_libraries(send-emails-lambda-handler PUBLIC mailio cpr fmt taopq gtest gmock_main AWS::aws-lambda-runtime)

target_include_directories(send-emails-lambda-handler PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

aws_lambda_package_target(send-emails-lambda-handler)

set(SOURCES
        MailioClient.cpp
        MessageRepositoryImpl.cpp
        SendMessagesCommandImpl.cpp
        DatabaseConnector.cpp
        DateServiceImpl.cpp
        RepeatedByMapperImpl.cpp
        )

set(UT_SOURCES
        DateServiceImplTest.cpp
        SendMessagesCommandImplTest.cpp
        EmailClientMock.h
        MessageRepositoryMock.h
        )

add_executable(send-messages-lambda-handler Main.cpp ${SOURCES})

target_link_libraries(send-messages-lambda-handler PUBLIC mailio fmt taopq AWS::aws-lambda-runtime)

target_include_directories(send-messages-lambda-handler PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

aws_lambda_package_target(send-messages-lambda-handler)

add_executable(send-messages-lambda-handlerUT ${UT_SOURCES} ${SOURCES})

target_link_libraries(send-messages-lambda-handlerUT PUBLIC mailio fmt taopq gtest gmock_main AWS::aws-lambda-runtime)

target_include_directories(send-messages-lambda-handlerUT PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

add_test(NAME send-messages-lambda-handlerUT COMMAND send-messages-lambda-handlerUT WORKING_DIRECTORY ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})

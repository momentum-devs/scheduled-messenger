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
        )

add_executable(scheduled-messenger Main.cpp ${SOURCES})

target_link_libraries(scheduled-messenger PUBLIC mailio cpr fmt taopq AWS::aws-lambda-runtime)

target_include_directories(scheduled-messenger PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

aws_lambda_package_target(scheduled-messenger)

add_executable(scheduled-messengerUT ${UT_SOURCES} ${SOURCES})
target_link_libraries(scheduled-messengerUT PUBLIC mailio cpr fmt taopq gtest gmock_main AWS::aws-lambda-runtime)
target_include_directories(scheduled-messengerUT PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})
add_test(NAME scheduled-messengerUT COMMAND scheduled-messengerUT WORKING_DIRECTORY ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})
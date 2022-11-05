set(SOURCES
        )

set(UT_SOURCES
        )

add_executable(delete-message-lambda-handler Main.cpp ${SOURCES})

target_link_libraries(delete-message-lambda-handler PUBLIC mailio fmt taopq AWS::aws-lambda-runtime)

target_include_directories(delete-message-lambda-handler PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})

aws_lambda_package_target(delete-message-lambda-handler)

#add_executable(delete-message-lambda-handlerUT ${UT_SOURCES} ${SOURCES})
#
#target_link_libraries(delete-message-lambda-handlerUT PUBLIC mailio fmt taopq gtest gmock_main AWS::aws-lambda-runtime)
#
#target_include_directories(delete-message-lambda-handlerUT PUBLIC ${GMOCK_INCLUDE_DIR} ${AWS_LAMBDA_CPP_INCLUDE_DIR})
#
#add_test(NAME delete-message-lambda-handlerUT COMMAND delete-message-lambda-handlerUT WORKING_DIRECTORY ${CMAKE_RUNTIME_OUTPUT_DIRECTORY})

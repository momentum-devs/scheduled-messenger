set(SOURCES 
        main.cpp 
        MailioClient.cpp
        MailClientMock.h)

add_executable(scheduled-messenger ${SOURCES})

target_link_libraries(scheduled-messenger PUBLIC mailio cpr fmt taopq gtest gmock_main)

target_include_directories(scheduled-messenger PUBLIC ${GMOCK_INCLUDE_DIR})

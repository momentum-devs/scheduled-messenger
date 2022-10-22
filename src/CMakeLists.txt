set(SOURCES 
        main.cpp 
        MailioClient.cpp
    )

add_executable(scheduled-messenger ${SOURCES})

target_link_libraries(scheduled-messenger PUBLIC mailio)

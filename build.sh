rm -rf ~/out
cd externals/aws-lambda-cpp || exit
rm -rf build
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX=~/out/aws-lambda-runtime
make -j 4
make install
cd ../../aws-sdk-cpp
rm -rf build
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_PREFIX_PATH=~/out/aws-sdk -DCMAKE_INSTALL_PREFIX=~/out/aws-sdk -DBUILD_ONLY="core;events;eventbridge"
make -j 4
make install
rm -rf build
cd ../../..
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH="~/out/aws-lambda-runtime;~/out/aws-sdk"
make -j 4
make aws-lambda-package-send-messages-lambda-handler -j 4
make aws-lambda-package-delete-message-lambda-handler -j 4
rm -f ../infrastructure/src/stacks/messagesProcessing/lambdas/sendMessagesLambda/sendMessagesLambdaHandler.zip
rm -f ../infrastructure/src/stacks/messagesProcessing/lambdas/deleteMessageLambda/deleteMessageLambdaHandler.zip
mv ./messagesProcessing/sendMessages/send-messages-lambda-handler.zip ../infrastructure/src/stacks/messagesProcessing/lambdas/sendMessagesLambda/sendMessagesLambdaHandler.zip
mv ./messagesProcessing/deleteMessage/delete-message-lambda-handler.zip ../infrastructure/src/stacks/messagesProcessing/lambdas/deleteMessageLambda/deleteMessageLambdaHandler.zip

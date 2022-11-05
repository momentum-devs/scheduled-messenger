rm -rf ~/out
cd externals/aws-lambda-cpp || exit
rm -rf build
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX=~/out
make -j 4
make install
cd ../../..
rm -rf build
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH=~/out
make -j 4
make aws-lambda-package-send-messages-lambda-handler -j 4
make aws-lambda-package-delete-message-lambda-handler -j 4
rm -f ../infrastructure/stacks/messagesProcessing/lambdas/sendMessagesLambdaHandler.zip
rm -f ../infrastructure/stacks/messagesProcessing/lambdas/deleteMessageLambdaHandler.zip
mv ./messagesProcessing/sendMessages/send-messages-lambda-handler.zip ../infrastructure/src/stacks/messagesProcessing/lambdas/sendMessagesLambda/sendMessagesLambdaHandler.zip
mv ./messagesProcessing/deleteMessage/delete-message-lambda-handler.zip ../infrastructure/src/stacks/messagesProcessing/lambdas/deleteMessageLambda/deleteMessageLambdaHandler.zip

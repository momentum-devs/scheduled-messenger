rm -rf ~/out
cd externals/aws-lambda-cpp || exit
rm -rf build
mkdir build
cd build || exit
AWS_LAMBDA_RUNTIME_BUILD_DIR="$HOME/out/aws-lambda-runtime"
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX="$AWS_LAMBDA_RUNTIME_BUILD_DIR"
make -j 4
make install
cd ../../aws-sdk-cpp || exit
rm -rf build
mkdir build
cd build || exit
AWS_SDK_BUILD_DIR="$HOME/out/aws-lambda-runtime"
cmake .. -DCMAKE_BUILD_TYPE=Debug -DCMAKE_PREFIX_PATH="$AWS_SDK_BUILD_DIR" -DCMAKE_INSTALL_PREFIX="$AWS_SDK_BUILD_DIR" -DBUILD_ONLY="core;events;eventbridge"
make -j 4
make install
rm -rf build
cd ../../..
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH="$AWS_LAMBDA_RUNTIME_BUILD_DIR;$AWS_SDK_BUILD_DIR"
make -j 4
make aws-lambda-package-send-messages-lambda-handler -j 4
make aws-lambda-package-delete-message-lambda-handler -j 4
SEND_MESSAGE_LAMBDA_DEST_LOC="../infrastructure/src/stacks/messagesProcessing/lambdas/sendMessagesLambda/sendMessagesLambdaHandler.zip"
DELETE_MESSAGE_LAMBDA_DEST_LOC="../infrastructure/src/stacks/messagesProcessing/lambdas/deleteMessageLambda/deleteMessageLambdaHandler.zip"
rm -f $SEND_MESSAGE_LAMBDA_DEST_LOC
rm -f $DELETE_MESSAGE_LAMBDA_DEST_LOC
mv ./messagesProcessing/sendMessages/send-messages-lambda-handler.zip $SEND_MESSAGE_LAMBDA_DEST_LOC
mv ./messagesProcessing/deleteMessage/delete-message-lambda-handler.zip $DELETE_MESSAGE_LAMBDA_DEST_LOC

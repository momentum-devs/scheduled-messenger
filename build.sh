cd externals/aws-lambda-cpp || exit
mkdir build
cd build || exit
AWS_LAMBDA_RUNTIME_BUILD_DIR="$HOME/out/aws-lambda-runtime"
cmake .. -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF -DCMAKE_INSTALL_PREFIX="$AWS_LAMBDA_RUNTIME_BUILD_DIR"
make -j 4
make install
cd ../../..
rm -rf build
mkdir build
cd build || exit
cmake .. -DCMAKE_BUILD_TYPE=Release -DCMAKE_PREFIX_PATH="$AWS_LAMBDA_RUNTIME_BUILD_DIR;$AWS_SDK_BUILD_DIR"
make -j 4
make aws-lambda-package-send-messages-lambda-handler -j 4
SEND_MESSAGE_LAMBDA_DEST_LOCATION="../infrastructure/src/stacks/messagesProcessing/lambdas/sendMessagesLambda/sendMessagesLambdaHandler.zip"
rm -f SEND_MESSAGE_LAMBDA_DEST_LOCATION
mv ./messagesProcessing/sendMessages/send-messages-lambda-handler.zip SEND_MESSAGE_LAMBDA_DEST_LOCATION

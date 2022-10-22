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
make aws-lambda-package-scheduled-messenger -j 4
rm -f ../infrastructure/stacks/messenger/scheduled-messenger.zip
mv ./src/scheduled-messenger.zip ../infrastructure/stacks/messenger/scheduled-messenger.zip

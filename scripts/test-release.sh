#!/usr/bin/env bash

TEST_DIR_NAME="wostreaming-targeting-sdk_release-test"
TEST_DIR="/tmp/$TEST_DIR_NAME"

cp -rp ./test/release-test "$TEST_DIR"
npm pack
pattern="wostreaming-targeting-sdk*.tgz"
files=($pattern)
package="${files[0]}"
mv "$package" "$TEST_DIR"
cd "$TEST_DIR"
npm i
npm i "$package"
npm start
rm -rf "$TEST_DIR"

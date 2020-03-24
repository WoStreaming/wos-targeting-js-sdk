#!/usr/bin/env bash

export RELEASE_DIR="wos-targeting-sdk_release_master"

npm run add-github-remote \
  && npm run build \
  && npm run release:clean \
  && npm run release:get-master \
  && cd "/tmp/$RELEASE_DIR" \
  && npm run release:bump-version \
  && npm run release:push \
  && npm run release:build \
  && npm run release:publish \
  && npm run release:clean

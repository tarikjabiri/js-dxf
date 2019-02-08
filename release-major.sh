#!/bin/bash -xe
yarn test && npm version major && npm publish

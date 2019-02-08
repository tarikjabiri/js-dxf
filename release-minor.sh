#!/bin/bash -xe
yarn test && npm version minor && npm publish

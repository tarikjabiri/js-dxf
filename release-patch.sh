#!/bin/bash -xe
yarn test && npm version patch && npm publish

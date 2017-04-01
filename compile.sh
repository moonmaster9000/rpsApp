#!/usr/bin/env bash

for dir in $@; do
    pushd $dir

    npm run compile
    npm run compile-test

    popd
done


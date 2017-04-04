#!/usr/bin/env bash

for dir in $@; do
    pushd $dir

    mkdir -p bundled

    npm run compile
    npm run compile-test

    popd
done


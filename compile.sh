#!/usr/bin/env bash

for dir in $@; do
    pushd $dir

    mkdir -p bundled

    yarn run compile
    yarn run compile-test

    popd
done


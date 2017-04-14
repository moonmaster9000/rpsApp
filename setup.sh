#!/usr/bin/env bash

DEPENDENCIES="rps rpsPresentationI18n webSpecs"
FRONTENDS="web reduxWeb refluxWeb angularWeb"

install() {
    for dir in $1; do
        pushd $dir
        yarn
        popd
    done
}

symlinkToGlobalModules() {
    for dir in $1; do
        pushd $dir
        yarn link
        popd
    done
}

symlinkFromGlobalModules() {
    for dir in $1; do
      pushd $dir

      for dep in $2; do
        yarn link $dep
      done

      popd
    done
}

install "$DEPENDENCIES"
install "$FRONTENDS"

symlinkToGlobalModules "$DEPENDENCIES"

symlinkFromGlobalModules "$FRONTENDS" "$DEPENDENCIES"
symlinkFromGlobalModules "webSpecs" "rps rpsPresentationI18n"

./compile.sh ${FRONTENDS}

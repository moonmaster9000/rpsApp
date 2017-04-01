#!/usr/bin/env bash

DEPENDENCIES="rps rpsPresentationI18n webSpecs"
FRONTENDS="web reduxWeb refluxWeb angularWeb"

install() {
    for dir in $1; do
        pushd $dir
        npm install
        popd
    done
}

npmLink() {
    for dir in $1; do
        pushd $dir
        npm link
        popd
    done
}

npmLinkDependencies() {
    for dir in $1; do
      pushd $dir

      for dep in $2; do
        npm link $dep
      done

      popd
    done
}

compile() {
    for dir in $1; do
        pushd $dir

        npm run compile
        npm run compile-test

        popd
    done
}

install "$DEPENDENCIES"
install "$FRONTENDS"

npmLink "$DEPENDENCIES"

npmLinkDependencies "$FRONTENDS" "$DEPENDENCIES"

compile "$FRONTENDS"
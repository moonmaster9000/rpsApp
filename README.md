
# rpsApp

This is a simple app that umpires a 2-person rock-paper-scissors games, and also provides a way to see historical results. 

## Setup

Note that the setup and build scripts depend on the `yarn` package manager (an `npm` replacement). See the [yarn installation guide](https://yarnpkg.com/en/docs/install) if you don't already have yarn installed on your computer.

To set up all of the modules (i.e., `yarn install`, `yarn link`, `yarn run compile`, and `yarn run compile-test`), run `./setup.sh`

## Running the tests

To run all of the tests, run `./build.sh`. Make sure you've first run `./setup.sh`. Note that the UI components are tested via a Chrome karma runner, so you'll need to install Chrome if you don't already have it on your computer. 

## rps

The rps module contains the high level policy (two use cases: play, and history). It also defines a contract for promise-based round repositories. The use cases use the observer pattern to invert the dependency on the UI. 

## webSpecs

This module exports a contract for the frontend. All frontend implementations conform to the contract. 

# rpsApp

This is a simple app that umpires a 2-person rock-paper-scissors games, and also provides a way to see historical results. 

## Setup

To set up all of the modules (i.e., `npm install` and `npm link` local modules), run `./setup.sh`

## Running the tests

To run all of the tests, run `./build.sh`. Make sure you've first run `./setup.sh`

## rps

The rps module contains the high level policy (two use cases: play, and history). It also defines a contract for promise-based round repositories. The use cases use the observer pattern to invert the dependency on the UI. 

## webSpecs

This module exports a contract for the frontend. All frontend implementations conform to the contract. 

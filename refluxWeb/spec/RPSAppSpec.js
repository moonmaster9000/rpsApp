const webSpecs = require("webSpecs")
const RPSApp = require("../RPSApp")
const React = require("react")

webSpecs((useCases) => <RPSApp useCases={useCases}/>)
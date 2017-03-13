const React = require("react")
const RPSApp = require("../RPSApp")
const webSpecs = require("webSpecs")

webSpecs(function(useCases){
    return <RPSApp useCases={useCases}/>
})


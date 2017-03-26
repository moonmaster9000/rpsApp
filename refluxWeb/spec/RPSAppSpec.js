const webSpecs = require("webSpecs")
const RPSApp = require("../RPSApp")
const React = require("react")
const ReactDOM = require("react-dom")

function appNode(){
    return document.getElementById("reactApp")
}

webSpecs(
    (useCases) => ReactDOM.render(<RPSApp useCases={useCases}/>, appNode()),
    () => { appNode().innerHTML = ""}
)
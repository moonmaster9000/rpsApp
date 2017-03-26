const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("../RPSApp")
const webSpecs = require("webSpecs")

function reactAppDOMNode() {
    return document.getElementById("reactApp");
}

webSpecs(function(useCases){
    ReactDOM.render(
        <RPSApp useCases={useCases}/>,
        reactAppDOMNode()
    )
}, function(){
    reactAppDOMNode().innerHTML=""
})


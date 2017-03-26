const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("../RPSApp")
const webSpecs = require("webSpecs")

webSpecs(
    function () {
        const div = document.createElement("div")
        div.id = "reactApp"
        return div
    },

    function (useCases) {
        ReactDOM.render(
            <RPSApp useCases={useCases}/>,
            document.getElementById("reactApp")
        )
    }
)
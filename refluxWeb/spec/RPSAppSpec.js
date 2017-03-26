const webSpecs = require("webSpecs")
const RPSApp = require("../RPSApp")
const React = require("react")
const ReactDOM = require("react-dom")

webSpecs(
    () => {
        const div = document.createElement("div")
        div.id = "reactApp"
        return div
    },

    (useCases) => {
        ReactDOM.render(
            <RPSApp useCases={useCases}/>,
            document.getElementById("reactApp")
        )
    }
)
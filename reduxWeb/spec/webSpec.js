const webSpecs = require("webSpecs")
const {createStore} = require("redux")
const {Provider} = require("react-redux")
const {RPSApp, reducer} = require("../RPSApp")
const React = require("react")
const ReactDOM = require("react-dom")

function appNode() {
    return document.getElementById("reactApp")
}

webSpecs(
    (useCases)=> {
        ReactDOM.render(<Provider store={createStore(reducer)}>
            <RPSApp useCases={useCases}/>
        </Provider>, appNode())
    },

    () => { appNode().innerHTML = "" }
)
const webSpecs = require("webSpecs")
const {createStore} = require("redux")
const {Provider} = require("react-redux")
const {RPSApp, reducer} = require("../RPSApp")
const React = require("react")
const ReactDOM = require("react-dom")

webSpecs(
    () => {
        const div = document.createElement("div")
        div.id = "reactApp"
        return div
    },

    (useCases)=> {
        ReactDOM.render(
            <Provider store={createStore(reducer)}>
                <RPSApp useCases={useCases}/>
            </Provider>,
            document.getElementById("reactApp")
        )
    },
)
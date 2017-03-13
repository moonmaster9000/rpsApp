const webSpecs = require("webSpecs")
const {createStore} = require("redux")
const {Provider} = require("react-redux")
const {RPSApp, reducer} = require("../RPSApp")
const React = require("react")

webSpecs((useCases)=>{
    return <Provider store={createStore(reducer)}>
        <RPSApp useCases={useCases}/>
    </Provider>
})
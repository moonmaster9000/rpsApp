const React = require("react")
const ReactDOM = require("react-dom")
const {createStore} = require('redux')
const {Provider} = require('react-redux')

const {RPSApp, reducer} = require("./RPSApp")

const {UseCaseFactory, FakeRepoFactory} = require("rps")

const useCases = new UseCaseFactory(new FakeRepoFactory())

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <RPSApp useCases={useCases}/>
    </Provider>,
    document.getElementById("app")
)
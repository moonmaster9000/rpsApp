const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("./RPSApp")
const { UseCaseFactory, FakeRepoFactory } = require("rps")

ReactDOM.render(
    <RPSApp useCases={new UseCaseFactory(new FakeRepoFactory())}/>,
    document.getElementById("app")
)
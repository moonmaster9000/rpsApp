const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("./RPSApp")
const {FakeRoundRepo} = require("rps")
const repo = new FakeRoundRepo()

ReactDOM.render(
    <RPSApp roundRepo={repo}></RPSApp>,
    document.getElementById("app")
)
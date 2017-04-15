const React = require("react")
const ReactDOM = require("react-dom")
const RPSApp = require("./RPSApp")
const {UseCaseFactory} = require("rps")
const PouchRepoFactory = require("pouchPersist")

ReactDOM.render(
    <RPSApp useCases={new UseCaseFactory(new PouchRepoFactory("webRoundDatabase"))}></RPSApp>,
    document.getElementById("app")
)
const RPSApp = require("../RPSApp")
const React = require("react")
const ReactDOM = require("react-dom")

const {FakeRoundRepo} = require("rps")

describe("foo", function () {
    beforeEach(function () {
        ReactDOM.render(
            <RPSApp repo={new FakeRoundRepo()}/>,
            document.getElementById("reactApp")
        )
    })

    it("bars", function () {
        expect(true).toBeTruthy()
    })
})
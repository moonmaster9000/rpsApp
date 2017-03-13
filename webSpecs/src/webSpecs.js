const React = require("react")
const ReactDOM = require("react-dom")

const {Round} = require("rps")

function webSpecs(reactAppFactory){
    describe("play", function () {
        describe("when the play use case fails validations", function () {
            beforeEach(function () {
                renderApp({
                    play: function(p1, p2, ui){ ui.invalid() }
                })
            })

            it("tells the user the input is invalid", function () {
                expect(page()).not.toContain(INVALID)
                play()
                expect(page()).toContain(INVALID)
            })
        })

        describe("when the play use case reports p1 wins", function () {
            beforeEach(function () {
                renderApp({
                    play: function(p1, p2, ui){ ui.p1Wins() }
                })
            })

            it("tells the user P1 Wins!", function () {
                expect(page()).not.toContain(P1_WINS)
                play()
                expect(page()).toContain(P1_WINS)
            })
        })

        describe("when the play use case reports p2 wins", function () {
            beforeEach(function () {
                renderApp({
                    play: function(p1, p2, ui){ ui.p2Wins() }
                })
            })

            it("tells the user P2 Wins!", function () {
                expect(page()).not.toContain(P2_WINS)
                play()
                expect(page()).toContain(P2_WINS)
            })
        })

        describe("when the play use case reports tie", function () {
            beforeEach(function () {
                renderApp({
                    play: function(p1, p2, ui){ ui.tie() }
                })
            })

            it("tells the user P2 Wins!", function () {
                expect(page()).not.toContain(TIE)
                play()
                expect(page()).toContain(TIE)
            })
        })

        describe("when the history returns results", function () {
            beforeEach(function () {
                renderApp({
                    history: ui=>ui.rounds([new Round("rock", "paper", "p1")])
                })
            })

            it("shows those rounds on the page", function () {
                play()
                expect(page()).toContain("rock")
                expect(page()).toContain("paper")
                expect(page()).toContain("p1")
            })

        })


        function page() {
            return document.getElementById("reactApp").innerText;
        }

        function play() {
            document.getElementById("playButton").click()
        }

        function renderApp(useCases) {
            useCases.history = useCases.history || function(){}
            useCases.play    = useCases.play    || function(){}

            ReactDOM.render(
                reactAppFactory(useCases),
                document.getElementById("reactApp")
            )
        }

        const P1_WINS = "P1 WINS"
        const P2_WINS = "P2 WINS"
        const TIE     = "TIE"
        const INVALID = "INVALID"

        afterEach(function () {
            document.getElementById("reactApp").innerHTML = ""
        })
    })
}

module.exports = webSpecs
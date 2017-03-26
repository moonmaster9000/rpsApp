const {Round} = require("rps")

function webSpecs(mountApp, unmountApp) {
    describe("play", function () {

        describe("given the user has entered throws", function () {
            let playSpy

            const p1Throw = "p1 throw", p2Throw = "p2 throw"

            beforeEach(function (done) {
                playSpy = jasmine.createSpy("play")

                renderApp({play: playSpy}, ()=> {
                    play(p1Throw, p2Throw)
                    done()
                })
            })

            it("sends the text inputs for p1 and p2 throws to the play function", function () {
                expect(playSpy.calls.mostRecent().args).toContain(p1Throw, p2Throw)
            })
        })

        describe("when the play use case fails validations", function () {
            beforeEach(function (done) {
                renderApp({
                    play: function (p1, p2, ui) {
                        ui.invalid()
                    }
                }, done)
            })

            it("tells the user the input is invalid", function () {
                expect(page()).not.toContain(INVALID)
                play()
                expect(page()).toContain(INVALID)
            })
        })

        describe("when the play use case reports p1 wins", function () {
            beforeEach(function (done) {
                renderApp({
                    play: function (p1, p2, ui) {
                        ui.p1Wins()
                    }
                }, done)
            })

            it("tells the user P1 Wins!", function () {
                expect(page()).not.toContain(P1_WINS)
                play()
                expect(page()).toContain(P1_WINS)
            })
        })

        describe("when the play use case reports p2 wins", function () {
            beforeEach(function (done) {
                renderApp({
                    play: function (p1, p2, ui) {
                        ui.p2Wins()
                    }
                }, done)
            })

            it("tells the user P2 Wins!", function () {
                expect(page()).not.toContain(P2_WINS)
                play()
                expect(page()).toContain(P2_WINS)
            })
        })

        describe("when the play use case reports tie", function () {
            beforeEach(function (done) {
                renderApp({
                    play: function (p1, p2, ui) {
                        ui.tie()
                    }
                }, done)
            })

            it("tells the user TIE!", function () {
                expect(page()).not.toContain(TIE)
                play()
                expect(page()).toContain(TIE)
            })
        })

        describe("when the history returns results", function () {
            let round

            beforeEach(function (done) {
                round = new Round("p1's Throw", "p2's Throw", "round winner")

                renderApp({
                    history: ui=>ui.rounds([round])
                }, done)
            })

            it("shows those rounds on the page", function () {
                expect(page()).toContain(round.p1Throw)
                expect(page()).toContain(round.p2Throw)
                expect(page()).toContain(round.winner)
            })
        })

        function page() {
            return document.getElementsByTagName("body")[0].innerText
        }

        function play(p1, p2) {
            setInputValue("p1ThrowInput", p1)
            setInputValue("p2ThrowInput", p2)
            click("playButton")
        }

        function setInputValue(id, value) {
            const input = document.getElementById(id)
            input.value = value

            input.dispatchEvent(new Event('input', {'bubbles': true, 'cancelable': true}))
        }

        function click(id) {
            document.getElementById(id).click()
        }

        function renderApp(useCases, done = ()=> {
        }) {
            useCases.history = useCases.history || function () {}
            useCases.play = useCases.play || function () {}

            mountApp(useCases)

            setTimeout(done, 0)
        }

        const P1_WINS = "P1 WINS"
        const P2_WINS = "P2 WINS"
        const TIE = "TIE"
        const INVALID = "INVALID"

        afterEach(function () {
            unmountApp()
        })
    })
}

module.exports = webSpecs
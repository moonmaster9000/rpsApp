const {Round} = require("rps")
const Locale = require("rpsPresentationI18n")

function webSpecs(createDOMFixture, mountApp, teardown = () => {}) {

    describe("play", function () {
        let locale, fixture

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

            it("sends the text inputs for p1 and p2 throws to the play function", function (done) {
                whenPageUpdates(() => expect(playSpy.calls.mostRecent().args).toContain(p1Throw, p2Throw), done)
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

            it("tells the user the input is invalid", function (done) {
                expect(page()).not.toContain(t("invalid"))
                play()
                whenPageUpdates(() => expect(page()).toContain(t("invalid")), done)
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

            it("tells the user P1 Wins!", function (done) {
                expect(page()).not.toContain(t("p1_wins"))
                play()
                whenPageUpdates(() => expect(page()).toContain(t("p1_wins")), done)
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

            it("tells the user P2 Wins!", function (done) {
                expect(page()).not.toContain(t("p2_wins"))
                play()
                whenPageUpdates(() => expect(page()).toContain(t("p2_wins")), done)
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

            it("tells the user TIE!", function (done) {
                expect(page()).not.toContain(t("tie"))
                play()
                whenPageUpdates(() => expect(page()).toContain(t("tie")), done)
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

            it("shows those rounds on the page", function (done) {
                whenPageUpdates(() => {
                    expect(page()).toContain(round.p1Throw)
                    expect(page()).toContain(round.p2Throw)
                    expect(page()).toContain(round.winner)
                }, done)
            })
        })

        describe("when the history returns no results", function () {
            let round

            beforeEach(function (done) {
                round = new Round("p1's Throw", "p2's Throw", "round winner")

                renderApp({
                    history: ui=>ui.norounds()
                }, done)
            })

            it("shows nothing", function () {
                // no errors thrown
            })
        })

        function page() {
            return document.querySelector("body").innerText
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

        function t(key){
            return locale.t(key)
        }

        function renderApp(useCases, done = ()=> {}) {
            useCases.history = useCases.history || function () {}
            useCases.play = useCases.play || function () {}

            mountApp(useCases)

            setTimeout(() => {
                done()
            }, 0)
        }

        function whenPageUpdates(assertion, done) {
            setTimeout(() => { assertion(); done() }, 20)
        }

        beforeEach(function () {
            locale = new Locale()
            fixture = createDOMFixture()
            document.getElementsByTagName("body")[0].appendChild(fixture)
        })

        afterEach(function () {
            fixture.remove()
            teardown()
        })
    })
}

module.exports = webSpecs

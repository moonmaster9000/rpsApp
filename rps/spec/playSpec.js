const { play } = require("../src/rps")

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui

    function makeSpy(spyFun){
        ui = jasmine.createSpyObj("uiSpy", [spyFun])
    }

    it("rock v. rock", function () {
        makeSpy("tie")

        play(ROCK, ROCK, ui)

        expect(ui.tie).toHaveBeenCalled()
    })

    it("paper v. rock", function () {
        makeSpy("p1Wins")

        play(PAPER, ROCK, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("rock v. paper", function () {
        makeSpy("p2Wins")

        play(ROCK, PAPER, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("scissors v. paper", function () {
        makeSpy("p1Wins")

        play(SCISSORS, PAPER, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("paper v. scissors", function () {
        makeSpy("p2Wins")

        play(PAPER, SCISSORS, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("rock v. scissors", function () {
        makeSpy("p1Wins")

        play(ROCK, SCISSORS, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("scissors v. rock", function () {
        makeSpy("p2Wins")

        play(SCISSORS, ROCK, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("sailboat v. rock", function () {
        makeSpy("p1Invalid")

        play("sailboat", ROCK, ui)

        expect(ui.p1Invalid).toHaveBeenCalled()
    })

    it("rock v. sailboat", function(){
        makeSpy("p2Invalid")

        play(ROCK, "sailboat", ui)

        expect(ui.p2Invalid).toHaveBeenCalled()
    })
})
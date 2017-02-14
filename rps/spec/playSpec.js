const { play, ValidationError } = require("../src/rps")
const FakeRoundRepo = require("./../src/FakeRoundRepo")

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui, repo

    function makeSpy(spyFun){
        ui = jasmine.createSpyObj("uiSpy", [spyFun])
        repo = new FakeRoundRepo()
    }

    it("rock v. rock", function () {
        makeSpy("tie")

        play(ROCK, ROCK, ui, repo)

        expect(ui.tie).toHaveBeenCalled()
    })

    it("paper v. rock", function () {
        makeSpy("p1Wins")

        play(PAPER, ROCK, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("rock v. paper", function () {
        makeSpy("p2Wins")

        play(ROCK, PAPER, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("scissors v. paper", function () {
        makeSpy("p1Wins")

        play(SCISSORS, PAPER, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("paper v. scissors", function () {
        makeSpy("p2Wins")

        play(PAPER, SCISSORS, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("rock v. scissors", function () {
        makeSpy("p1Wins")

        play(ROCK, SCISSORS, ui, repo)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("scissors v. rock", function () {
        makeSpy("p2Wins")

        play(SCISSORS, ROCK, ui, repo)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("sailboat v. rock", function () {
        makeSpy("invalid")

        play("sailboat", ROCK, ui, repo)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p1", "invalidThrow")])
    })

    it("rock v. sailboat", function(){
        makeSpy("invalid")

        play(ROCK, "sailboat", ui, repo)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p2", "invalidThrow")])
    })
})
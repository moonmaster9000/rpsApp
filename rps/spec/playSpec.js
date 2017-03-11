const {UseCaseFactory, ValidationError} = require("../src/rps")
const FakeRepoFactory = require("./../src/FakeRepoFactory")

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui, useCases

    function makeSpy(spyFun){
        ui = jasmine.createSpyObj("uiSpy", [spyFun])
        useCases = new UseCaseFactory(new FakeRepoFactory())
    }

    it("rock v. rock", function () {
        makeSpy("tie")

        useCases.play(ROCK, ROCK, ui)

        expect(ui.tie).toHaveBeenCalled()
    })

    it("paper v. rock", function () {
        makeSpy("p1Wins")

        useCases.play(PAPER, ROCK, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("rock v. paper", function () {
        makeSpy("p2Wins")

        useCases.play(ROCK, PAPER, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("scissors v. paper", function () {
        makeSpy("p1Wins")

        useCases.play(SCISSORS, PAPER, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("paper v. scissors", function () {
        makeSpy("p2Wins")

        useCases.play(PAPER, SCISSORS, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("rock v. scissors", function () {
        makeSpy("p1Wins")

        useCases.play(ROCK, SCISSORS, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    it("scissors v. rock", function () {
        makeSpy("p2Wins")

        useCases.play(SCISSORS, ROCK, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    it("sailboat v. rock", function () {
        makeSpy("invalid")

        useCases.play("sailboat", ROCK, ui)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p1", "invalidThrow")])
    })

    it("rock v. sailboat", function(){
        makeSpy("invalid")

        useCases.play(ROCK, "sailboat", ui)

        expect(ui.invalid).toHaveBeenCalledWith([new ValidationError("p2", "invalidThrow")])
    })
})
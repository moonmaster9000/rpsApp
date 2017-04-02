const {UseCaseFactory} = require("../src/rps")
const FakeRepoFactory = require("./../src/FakeRepoFactory")
const asyncIt = require("./support/asyncIt")

describe("play", function () {
    const ROCK = "rock"
    const PAPER = "paper"
    const SCISSORS = "scissors"

    let ui, useCases

    function makeSpy(spyFun){
        ui = jasmine.createSpyObj("uiSpy", [spyFun])
        useCases = new UseCaseFactory(new FakeRepoFactory())
    }

    asyncIt("rock v. rock", async function () {
        makeSpy("tie")

        await useCases.play(ROCK, ROCK, ui)

        expect(ui.tie).toHaveBeenCalled()
    })


    asyncIt("paper v. rock", async function () {
        makeSpy("p1Wins")

        await useCases.play(PAPER, ROCK, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    asyncIt("rock v. paper", async function () {
        makeSpy("p2Wins")

        await useCases.play(ROCK, PAPER, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    asyncIt("scissors v. paper", async function () {
        makeSpy("p1Wins")

        await useCases.play(SCISSORS, PAPER, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    asyncIt("paper v. scissors", async function () {
        makeSpy("p2Wins")

        await useCases.play(PAPER, SCISSORS, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    asyncIt("rock v. scissors", async function () {
        makeSpy("p1Wins")

        await useCases.play(ROCK, SCISSORS, ui)

        expect(ui.p1Wins).toHaveBeenCalled()
    })

    asyncIt("scissors v. rock", async function () {
        makeSpy("p2Wins")

        await useCases.play(SCISSORS, ROCK, ui)

        expect(ui.p2Wins).toHaveBeenCalled()
    })

    asyncIt("sailboat v. rock", async function () {
        makeSpy("invalid")

        await useCases.play("sailboat", ROCK, ui)

        expect(ui.invalid).toHaveBeenCalled()
    })

    asyncIt("rock v. sailboat", async function(){
        makeSpy("invalid")

        await useCases.play(ROCK, "sailboat", ui)

        expect(ui.invalid).toHaveBeenCalled()
    })
})
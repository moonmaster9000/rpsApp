const {UseCaseFactory} = require("../src/rps")
const Round = require("../src/Round")
const FakeRepoFactory = require("./../src/FakeRepoFactory")
const asyncIt = require("./support/asyncIt")

describe("history", function () {
    let ui, useCases, repoFactory

    beforeEach(function () {
        ui = jasmine.createSpyObj("ui", ["norounds", "p2Wins", "rounds", "tie", "invalid", "p1Wins"])
        repoFactory = new FakeRepoFactory()
        useCases = new UseCaseFactory(repoFactory)
    })

    asyncIt("given folks have played before", async function () {
        await Promise.all([
            useCases.play("rock", "paper", ui),
            useCases.play("paper", "paper", ui),
            useCases.play("scissors", "paper", ui),
            useCases.play("sailboat", "paper", ui),
        ])

        await useCases.history(ui)

        expect(ui.rounds).toHaveBeenCalledWith([
            new Round("rock", "paper", "p2"),
            new Round("paper", "paper", "tie"),
            new Round("scissors", "paper", "p1"),
            new Round("sailboat", "paper", "invalid"),
        ])
    })


    asyncIt("given no one has played before", async function () {
        let val = await useCases.history(ui)

        expect(ui.norounds).toHaveBeenCalled()
    })
})

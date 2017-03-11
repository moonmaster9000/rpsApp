const {UseCaseFactory} = require("../src/rps")
const Round = require("../src/Round")
const FakeRepoFactory = require("./../src/FakeRepoFactory")

describe("history", function () {
    let ui, useCases

    beforeEach(function () {
        ui = jasmine.createSpyObj("ui", ["norounds", "p2Wins", "rounds", "tie", "invalid", "p1Wins"])
        useCases = new UseCaseFactory(new FakeRepoFactory())
    })

    it("given folks have played before", function(){
        useCases.play("rock", "paper", ui)
        useCases.play("paper", "paper", ui)
        useCases.play("scissors", "paper", ui)
        useCases.play("sailboat", "paper", ui)

        useCases.history(ui)

        expect(ui.rounds).toHaveBeenCalledWith([
            new Round("rock", "paper", "p2"),
            new Round("paper", "paper", "tie"),
            new Round("scissors", "paper", "p1"),
            new Round("sailboat", "paper", "invalid"),
        ])
    })

    it("given no one has played before", function () {
        useCases.history(ui)

        expect(ui.norounds).toHaveBeenCalled()
    })
})

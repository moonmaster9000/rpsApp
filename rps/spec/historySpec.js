const { play } = require("../src/rps")
const history = require("../src/history")
const Round = require("../src/Round")
const FakeRoundRepo = require("./../src/FakeRoundRepo")

describe("history", function () {
    let ui, repo

    beforeEach(function () {
        ui = jasmine.createSpyObj("ui", ["norounds", "p2Wins", "rounds", "tie", "invalid", "p1Wins"])
        repo = new FakeRoundRepo()

    })

    it("given folks have played before", function(){
        play("rock", "paper", ui, repo)
        play("paper", "paper", ui, repo)
        play("scissors", "paper", ui, repo)
        play("sailboat", "paper", ui, repo)

        history(ui, repo)

        expect(ui.rounds).toHaveBeenCalledWith([
            new Round("rock", "paper", "p2"),
            new Round("paper", "paper", "tie"),
            new Round("scissors", "paper", "p1"),
            new Round("sailboat", "paper", "invalid"),
        ])
    })

    it("given no one has played before", function () {
        history(ui, repo)

        expect(ui.norounds).toHaveBeenCalled()
    })
})

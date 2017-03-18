const {UseCaseFactory} = require("../src/rps")
const Round = require("../src/Round")
const FakeRepoFactory = require("./../src/FakeRepoFactory")

describe("history", function () {
    let ui, useCases, repoFactory

    beforeEach(function () {
        ui = jasmine.createSpyObj("ui", ["norounds", "p2Wins", "rounds", "tie", "invalid", "p1Wins"])
        repoFactory = new FakeRepoFactory()
        useCases = new UseCaseFactory(repoFactory)
    })

    it("given folks have played before", function(done){
        useCases.play("rock", "paper", ui)
        useCases.play("paper", "paper", ui)
        useCases.play("scissors", "paper", ui)
        useCases.play("sailboat", "paper", ui)

        useCases.history(ui)

        tick(()=>{
            expect(ui.rounds).toHaveBeenCalledWith([
                new Round("rock", "paper", "p2"),
                new Round("paper", "paper", "tie"),
                new Round("scissors", "paper", "p1"),
                new Round("sailboat", "paper", "invalid"),
            ])

            done()
        })
    })

    it("given no one has played before", function (done) {
        useCases.history(ui)

        tick(()=> {
            expect(ui.norounds).toHaveBeenCalled()
            done()
        })
    })

    const tick = (f) => setTimeout(f, 0)
})

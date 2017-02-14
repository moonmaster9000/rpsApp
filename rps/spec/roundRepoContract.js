const Round = require("../src/Round")

function roundRepoContract(roundRepoClass){
    describe("Round Repo Contract", function () {
        let repo

        beforeEach(function () {
            repo = new roundRepoClass()
        })

        it("saves rounds", function () {
            let play = new Round("rock", "rock", "tie")

            repo.save(play)

            expect(repo.getAll()).toContain(play)
        })

        describe("when there are no rounds", function () {
            it("is empty", function () {
                expect(repo.empty()).toBeTruthy()
            })
        })

        describe("when there are rounds", function () {
            it("is not empty", function () {
                repo.save(new Round())

                expect(repo.empty()).toBeFalsy()
            })
        })
    })
}

module.exports = roundRepoContract
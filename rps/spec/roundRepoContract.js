const Round = require("../src/Round")

function roundRepoContract(repoFactoryClass) {
    describe("Round Repo Contract", function () {
        let repo

        beforeEach(function () {
            repo = new repoFactoryClass().roundRepo()
        })

        it("saves rounds", function (done) {
            let round = new Round("paper")

            repo.save(round)
                .then(()=>repo.getAll())
                .then(rounds=> {
                    expect(rounds).toContain(round)
                    done()
                })
        })

        describe("when there are no rounds", function () {
            it("is empty", function () {
                repo.empty()
                    .then((isEmpty)=> {
                        expect(isEmpty).toBe(true)
                    })
            })
        })

        describe("when there are rounds", function () {
            it("is not empty", function (done) {
                repo.save(new Round("paper"))
                    .then(()=>repo.empty())
                    .then((isEmpty)=> {
                        expect(isEmpty).toBeFalsy()
                        done()
                    })
            })
        })
    })
}

module.exports = roundRepoContract
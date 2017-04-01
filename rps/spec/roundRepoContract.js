const Round = require("../src/Round")

function testAsync(asyncFun) {
    return (done) => {
        asyncFun().then(done, e=> {
            fail(e);
            done();
        })
    }
}

function roundRepoContract(repoFactoryClass) {
    describe("Round Repo Contract", function () {
        let repo

        beforeEach(function () {
            repo = new repoFactoryClass().roundRepo()
        })

        it("saves rounds", testAsync(async function () {
            let round = new Round()

            await repo.save(round)
            let rounds = await repo.getAll()
            expect(rounds).toContain(round)
        }))

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
                repo.save(new Round())
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
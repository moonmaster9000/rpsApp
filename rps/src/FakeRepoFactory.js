const FakeRoundRepo = require("./FakeRoundRepo")

const FakeRepoFactory = function(){
    let round

    this.roundRepo = function(){
        if (round != null){
            return round
        }

        round = new FakeRoundRepo()

        return round
    }
}

module.exports = FakeRepoFactory
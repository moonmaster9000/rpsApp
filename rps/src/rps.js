const play = require("./play")
const history = require("./history")
const FakeRepoFactory = require("./FakeRepoFactory")
const Round = require("./Round")

function UseCaseFactory(repoFactory){
    this.play = async function(p1, p2, ui){
        return play(p1, p2, ui, repoFactory.roundRepo())
    }

    this.history = async function(ui){
        return history(ui, repoFactory.roundRepo())
    }
}

module.exports = {
    UseCaseFactory,
    FakeRepoFactory,
    Round,
}

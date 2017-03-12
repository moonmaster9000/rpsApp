const play = require("./play")
const history = require("./history")
const FakeRepoFactory = require("./FakeRepoFactory")
const Round = require("./Round")

function UseCaseFactory(repoFactory){
    this.play = function(p1, p2, ui){
        play(p1, p2, ui, repoFactory.roundRepo())
    }

    this.history = function(ui){
        history(ui, repoFactory.roundRepo())
    }
}

module.exports = {
    UseCaseFactory,
    FakeRepoFactory,
    Round,
}

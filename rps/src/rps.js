const {play, ValidationError} = require("./play")
const history = require("./history")

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
    ValidationError,
}

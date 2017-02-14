function FakeRoundRepo(){
    const rounds = []

    this.save = function(play){
        rounds.push(play)
    }

    this.empty = function(){
        return rounds.length === 0
    }

    this.getAll = function(){
        return rounds
    }
}

module.exports = FakeRoundRepo
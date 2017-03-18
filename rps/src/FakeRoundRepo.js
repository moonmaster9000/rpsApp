function FakeRoundRepo(){
    const rounds = []

    this.save = function(play){
        rounds.push(play)
        return Promise.resolve()
    }

    this.empty = function(){
        return Promise.resolve(rounds.length === 0)
    }

    this.getAll = function(){
        return Promise.resolve(rounds)
    }
}

module.exports = FakeRoundRepo
const Locale = function(){
    const en = {
        "invalid": "INVALID",
        "p1_wins": "P1 WINS",
        "p2_wins": "P2 WINS",
        "tie":     "TIE",
    }

    const words = en

    this.t = this.translate = function(key){
        return words[key]
    }
}

module.exports = Locale
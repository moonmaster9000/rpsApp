const Round = require("./Round")

function play(p1, p2, ui, repo){
    new RoundUseCase(p1, p2, ui, repo).execute()
}

function RoundUseCase(p1, p2, ui, repo){
    this.execute = function(){
        checkInvalid()     &&
        checkTie()         &&
        determineWinner()
    }

    function checkTie(){
        if (tie()){
            repo.save(new Round(p1, p2, "tie"))
            ui.tie()
            return false
        }

        return true
    }

    function determineWinner(){
        if (p1BeatsP2()){
            repo.save(new Round(p1, p2, "p1"))
            ui.p1Wins()
        }
        else {
            repo.save(new Round(p1, p2, "p2"))
            ui.p2Wins()
        }
    }

    function checkInvalid(){
        if (invalid(p1) || invalid(p2)){
            repo.save(new Round(p1, p2, "invalid"))
            ui.invalid()
        } else {
            return true
        }
    }

    const VALID_INPUTS = ["rock", "paper", "scissors"]

    function invalid(playerThrow) {
        return !VALID_INPUTS.includes(playerThrow)
    }

    function tie() {
        return p1 === p2;
    }

    function p1BeatsP2() {
        return p1 === "paper" && p2 === "rock" ||
            p1 === "scissors" && p2 === "paper" ||
            p1 === "rock" && p2 === "scissors";
    }
}

module.exports = play

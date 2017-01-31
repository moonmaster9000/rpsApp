function play(p1, p2, ui){
    new PlayUseCase(p1, p2, ui).execute()
}

function PlayUseCase(p1, p2, ui){
    this.execute = function(){
        checkInvalid()     &&
        checkTie()         &&
        determineWinner()
    }

    function checkTie(){
        if (tie()){
            ui.tie()
            return false
        }

        return true
    }

    function determineWinner(){
        if (p1BeatsP2())
            ui.p1Wins()
        else
            ui.p2Wins()
    }

    function checkInvalid(){
        if (invalid(p1))
            ui.p1Invalid()

        else if (invalid(p2))
            ui.p2Invalid()

        else
            return true
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

module.exports = {
    play
}
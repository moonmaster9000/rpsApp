const Round = require("./Round")

async function play(p1, p2, ui, repo){
    new RoundUseCase(p1, p2, ui, repo).execute()
}

function RoundUseCase(p1, p2, ui, repo){
    this.execute = function(){
        if (invalid(p1) || invalid(p2)){
            recordInvalidRound()
        } else if (tie()){
            recordTie()
        } else {
            recordWinner()
        }
    }

    async function recordInvalidRound() {
        await repo.save(new Round(p1, p2, "invalid"))
        ui.invalid()
    }

    async function recordTie() {
        await repo.save(new Round(p1, p2, "tie"))
        ui.tie()
    }

    async function recordWinner(){
        if (p1BeatsP2()){
            await repo.save(new Round(p1, p2, "p1"))
            ui.p1Wins()
        }
        else {
            await repo.save(new Round(p1, p2, "p2"))
            ui.p2Wins()
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
            p1 === "rock" && p2 === "scissors"
    }
}

module.exports = play

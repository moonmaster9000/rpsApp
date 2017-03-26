const {Component} = require("@angular/core")
const { UseCaseFactory } = require("rps")

const RPSApp = Component({
    selector: "rps-app",
    template: `
        <h1>{{ message }}</h1>
        
        <form (submit)="onSubmit($event)">
             <input type="text" name="p1" id="p1ThrowInput" [(ngModel)]="model.p1" >
             <input type="text" name="p2" id="p2ThrowInput" [(ngModel)]="model.p2" >

             <button id="playButton" type="submit">Play</button>
        </form>
        
        <ul>
            <li *ngFor="let round of history">{{round.p1Throw}} {{round.p2Throw}} {{round.winner}}</li>
        </ul>
`
}).Class({
    constructor: [UseCaseFactory, function(useCases){
        this.model = {p1: "", p2: ""}
        this.message = ""
        this.useCases = useCases
        this.history = []
        this.updateHistory()
    }],

    updateHistory() {
        this.useCases.history(this)
    },

    onSubmit(e){
        e.preventDefault()
        this.useCases.play(this.model.p1, this.model.p2, this)
    },

    invalid(){
        this.message = "INVALID"
        this.updateHistory()
    },

    p1Wins(){
        this.message = "P1 WINS"
        this.updateHistory()
    },

    p2Wins(){
        this.message = "P2 WINS"
        this.updateHistory()
    },

    tie(){
        this.message = "TIE"
        this.updateHistory()
    },

    rounds(rs){
        this.history = rs
    },

    norounds(){
    }
})

module.exports = RPSApp
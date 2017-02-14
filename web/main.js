const {play, history, FakeRoundRepo} = require("rps")
const React = require("react")
const ReactDOM = require("react-dom")
const repo = new FakeRoundRepo()

const RPSApp = React.createClass({
    getInitialState() {
        return {
            errors: [],
            winner: null,
            rounds: <h1>no rounds</h1>
        }
    },

    submitRound(e){
        e.preventDefault()
        play(this.state.p1, this.state.p2, this, repo)
    },

    p1Changed(e){
        this.setState({p1: e.target.value})
    },

    p2Changed(e){
        this.setState({p2: e.target.value})
    },

    invalid(errors){
        history(this, repo)
        this.setState({errors})
    },

    clearErrors() {
        this.setState({errors: []})
    },

    assignWinner: function (winner) {
        this.clearErrors()
        this.setState({winner: <h1>{winner} wins!</h1>})
    },

    p1Wins(){
        history(this, repo)
        this.assignWinner("p1")
    },

    p2Wins(){
        history(this, repo)
        this.assignWinner("player two")
    },

    tie(){
        history(this, repo)
        this.clearErrors()
        this.setState({winner: <h1>TIE</h1>})
    },

    norounds(){
    },

    rounds(rs){
        this.setState({
            rounds: rs.map((r) => <li>{r.p1Throw} {r.p2Throw} {r.winner}</li>)
        })
    },

    renderErrors() {
        return <ul>
            {this.state.errors.map((error) => <li>{error.field} - {error.errorCode}</li>)}
        </ul>
    },

    render() {
        return <div>
            {this.renderErrors()}

            {this.state.winner}

            <form onSubmit={this.submitRound}>
                <input type="text" name="p1" onChange={this.p1Changed}/>
                <input type="text" name="p2" onChange={this.p2Changed}/>
                <input type="submit" value="Play"/>
            </form>

            <ul>
                {this.state.rounds}
            </ul>
        </div>
    }
})

ReactDOM.render(
    <RPSApp></RPSApp>,
    document.getElementById("app")
)
const React = require("react")
const {play, history} = require("rps")

const RPSApp = React.createClass({
    getInitialState() {
        return {
            errors: [],
            winner: null,
            rounds: <h1>no rounds</h1>
        }
    },

    getRoundRepo: function () {
        return this.props.roundRepo;
    },

    submitRound(e){
        e.preventDefault()
        play(this.state.p1, this.state.p2, this, this.getRoundRepo())
    },

    p1Changed(e){
        this.setState({p1: e.target.value})
    },

    p2Changed(e){
        this.setState({p2: e.target.value})
    },

    invalid(errors){
        history(this, this.getRoundRepo())
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
        history(this, this.getRoundRepo())
        this.assignWinner("p1")
    },

    p2Wins(){
        history(this, this.getRoundRepo())
        this.assignWinner("player two")
    },

    tie(){
        history(this, this.getRoundRepo())
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

module.exports = RPSApp
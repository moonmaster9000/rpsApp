const React = require("react")
const {play, history} = require("rps")
const Locale = require("rpsPresentationI18n")

const locale = new Locale()

const RPSApp = React.createClass({
    getInitialState() {
        return {
            errors: null,
            winner: null,
            rounds: <h1>no rounds</h1>
        }
    },

    useCases: function() {
        return this.props.useCases  
    },

    componentWillMount: function(){
        this.useCases().history(this)
    },

    submitRound(e){
        e.preventDefault()
        this.useCases().play(this.state.p1, this.state.p2, this)
    },

    p1Changed(e){
        this.setState({p1: e.target.value})
    },

    p2Changed(e){
        this.setState({p2: e.target.value})
    },

    invalid(){
        this.useCases().history(this)
        this.setState({errors: locale.t("invalid"), winner: null})
    },

    clearErrors() {
        this.setState({errors: null})
    },

    assignWinner: function (winner) {
        this.clearErrors()
        this.setState({winner: <h1>{locale.t(`${winner}_wins`)}</h1>})
    },

    p1Wins(){
        this.useCases().history(this)
        this.assignWinner("p1")
    },

    p2Wins(){
        this.useCases().history(this)
        this.assignWinner("p2")
    },

    tie(){
        this.useCases().history(this)
        this.clearErrors()
        this.setState({winner: <h1>{locale.t("tie")}</h1>})
    },

    norounds(){
    },

    rounds(rs){
        this.setState({
            rounds: rs.map((r, i) => <li key={i}>{r.p1Throw} {r.p2Throw} {r.winner}</li>)
        })
    },

    renderErrors() {
        return <h1>{this.state.errors}</h1>
    },

    render() {
        return <div>
            {this.renderErrors()}

            {this.state.winner}

            <form onSubmit={this.submitRound}>
                <input type="text" name="p1" id="p1ThrowInput" onChange={this.p1Changed}/>
                <input type="text" name="p2" id="p2ThrowInput" onChange={this.p2Changed}/>
                <input id="playButton" type="submit" value="Play"/>
            </form>

            <ul>
                {this.state.rounds}
            </ul>
        </div>
    }
})

module.exports = RPSApp
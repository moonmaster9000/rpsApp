const React = require("react")
const Reflux = require("reflux")

const invalidInputAction = Reflux.createAction()
const p1WinsAction = Reflux.createAction()
const p2WinsAction = Reflux.createAction()
const tieAction = Reflux.createAction()
const roundsFoundAction = Reflux.createAction()

class RPSAppStore extends Reflux.Store {
    constructor() {
        super()
        this.state = {
            message: null,
            rounds: []
        }

        this.listenTo(invalidInputAction, this.handleInvalidInput)
        this.listenTo(p1WinsAction, this.handleP1Wins)
        this.listenTo(p2WinsAction, this.handleP2Wins)
        this.listenTo(tieAction, this.handleTie)
        this.listenTo(roundsFoundAction, this.handleRoundsFound)
    }

    handleInvalidInput() {
        this.setState({message: "INVALID"})
    }

    handleP1Wins() {
        this.setState({message: "P1 WINS"})
    }

    handleP2Wins() {
        this.setState({message: "P2 WINS"})
    }

    handleTie() {
        this.setState({message: "TIE"})
    }

    handleRoundsFound(rounds) {
        this.setState({rounds})
    }
}

class RPSApp extends Reflux.Component {
    constructor(props) {
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
        this.store = RPSAppStore
    }

    componentDidMount(){
        this.props.useCases.history(this)
    }

    submitHandler(e) {
        e.preventDefault()
        this.props.useCases.play(document.getElementById("p1ThrowInput").value, document.getElementById("p2ThrowInput").value, this)
    }

    p1Wins() {
        p1WinsAction()
    }

    p2Wins() {
        p2WinsAction()
    }

    tie() {
        tieAction()
    }

    invalid() {
        invalidInputAction()
    }

    rounds(rs) {
        roundsFoundAction(rs)
    }

    render() {
        return <div>
            <h1>{this.state.message}</h1>

            <form onSubmit={this.submitHandler}>
                <input type="text" name="p1" id="p1ThrowInput" />
                <input type="text" name="p2" id="p2ThrowInput" />
                <input type="submit" value="play" id="playButton"/>
            </form>

            <ul>
                {this.state.rounds.map((r) => <li>{r.p1Throw} {r.p2Throw} {r.winner}</li>)}
            </ul>
        </div>
    }
}

module.exports = RPSApp
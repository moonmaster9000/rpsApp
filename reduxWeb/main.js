const React = require("react")
const ReactDOM = require("react-dom")
const { play, history, FakeRoundRepo } = require("rps")
const repo = new FakeRoundRepo()

const { createStore, combineReducers } = require('redux')
const { Provider, connect } = require('react-redux')

let RoundHistory = ({rounds}) => {
    return <ul>
        {rounds.map((r) => <li>{r.p1Throw} {r.p2Throw} {r.winner}</li>)}
    </ul>
}

let RPSApp = ({
    //mapStateToProps
    roundHistory,
    gameResult,
    p1,
    p2,

    //mapDispatchToProps
    onSubmitHandler,
    handleP1InputChange,
    handleP2InputChange
}) => {
    let submitHandler = (e) => {
        e.preventDefault()
        onSubmitHandler(p1, p2)
    }

    return <div>
        {gameResult}

        <form onSubmit={submitHandler}>
            <input type="text" name="p1" onChange={handleP1InputChange}/>
            <input type="text" name="p2" onChange={handleP2InputChange}/>

            <input type="submit" value="PLAY"/>
        </form>

        {roundHistory}
    </div>
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {
    const historyObserver = {
        rounds(rs){
            dispatch({type: 'ROUNDS', rounds: rs})
        }
    }

    const playObserver = {
        tie(){
            dispatch({type: 'TIE'})
            history(historyObserver, repo)
        },

        p2Wins(){
            dispatch({type: 'P2_WINS'})
            history(historyObserver, repo)
        },

        p1Wins(){
            dispatch({type: 'P1_WINS'})
            history(historyObserver, repo)
        },

        invalid(){
            dispatch({type: 'INVALID'})
            history(historyObserver, repo)
        }
    }

    return {
        onSubmitHandler(p1, p2) {
            play(p1, p2, playObserver, repo)
        },

        handleP1InputChange(e){
            e.preventDefault()
            dispatch({type: 'P1_CHANGED', text: e.target.value})
        },

        handleP2InputChange(e){
            e.preventDefault()
            dispatch({type: 'P2_CHANGED', text: e.target.value})
        }
    }
}

RPSApp = connect(mapStateToProps, mapDispatchToProps)(RPSApp)

const gameResult = (state='NONE', action) => {
    switch(action.type) {
        case 'TIE':
            return 'TIE GAME'
        case 'P1_WINS':
            return 'P1 WINS'
        case 'P2_WINS':
            return 'P2 WINS'
        case 'INVALID':
            return 'INVALID'
        default:
            return state
    }
}

const p1 = (state='', action) => {
    switch(action.type) {
        case 'P1_CHANGED':
            return action.text
        default:
            return state
    }
}

const p2 = (state='', action) => {
    switch (action.type) {
        case 'P2_CHANGED':
            return action.text
        default:
            return state
    }
}

const roundHistory = (state='NO ROUNDS', action) => {
    switch (action.type){
        case 'ROUNDS':
            return <RoundHistory rounds={action.rounds}/>
        default:
            return state
    }
}

const reducer = combineReducers({
    gameResult,
    p1,
    p2,
    roundHistory
})

ReactDOM.render(
    <Provider store={createStore(reducer)}>
        <RPSApp/>
    </Provider>,
    document.getElementById("app")
)
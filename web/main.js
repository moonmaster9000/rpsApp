const { play } = require("rps")
const React = require("react")
const ReactDOM = require("react-dom")

const Play = React.createClass({
    getInitialState() {
        return {}
    },

    submitPlay(e){
        e.preventDefault()
        play(this.state.p1, this.state.p2, this)
    },

    p1Changed(e){
        this.setState({p1: e.target.value})
    },
    
    p2Changed(e){
        this.setState({p2: e.target.value})
    },

    p1Invalid(){
        alert("p1 is invalid!")
    },

    p2Invalid(){
        alert("p2 is invalid!")
    },

    p1Wins(){
        alert("p1 wins!")
    },

    p2Wins(){
        alert("p2 wins!")
    },

    tie(){
        alert("players tied")
    },

    render() {
        return <div>
            <form onSubmit={this.submitPlay}>
                <input type="text" name="p1" onChange={this.p1Changed}/>
                <input type="text" name="p2" onChange={this.p2Changed}/>
                <input type="submit" value="Play"/>
            </form>
        </div>
    }
})

ReactDOM.render(
    <Play></Play>,
    document.getElementById("app")
)
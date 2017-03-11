const React = require("react")
const ReactDOM = require("react-dom")
const Reflux = require("reflux")

class App extends Reflux.Component{
    constructor(props){
        super(props)
    }

    render(){
        return <p>Hello World!</p>
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
)
# React Cheat Sheet

Getting started with React is simple. There's only three things you need to know to get started: Components, props, and state.

## Components 

Components are the basic building blocks of a react app. They have a `render` method:

```jsx
const React = require("react")

class HelloWorld extends React.Component{
  render(){
    return <h1>Hello World!</h1>
  }
}
```

Note that this is not just Javascript, it's "Javascript XML", or "JSX". You have to transpile it to Javascript to run it in a browser. For example, if you use `npm` or `yarn` to install `browserify`, `babelify`, `babel-preset-es2015`, and `babel-preset-react`, you could then run the following command to transpile your JSX (assuming you put the preceding code in a file called `main.js`): `browserify main.js -o compiled_main.js -t [ babelify --presets [ es2015 react ] ]` 

To mount that to a page, use `react-dom`: 

```jsx
const ReactDOM = require("react-dom")

ReactDOM.render(
  <HelloWorld/>,
  document.getElementById("reactApp")
)
```

This would mount the `HelloWorld` component to the page by attaching to a DOM element with the ID `reactApp`. 

You'd need an HTML page that looked something like this: 

```html
<html>
<body>
  <div id="reactApp"/>
  <script src="compiledMain.js" type="application/javascript"></script>
</body>
</html>
```

If you've put everything together correctly, then when you open that file in your favorite browser, you'll see "Hello World!" on the page!

## Props

Props are values that you pass into the react component. Think of them like constructor parameters. In fact, they can be explicitly received as constructor parameters:

```jsx
class Counter extends React.Component {
  render(){
    return <p>Counter Value: {this.props.initialCounterValue}</p>
  }
}

ReactDOM.render(
  <Counter initialCounterValue={1}/>,
  document.getElementById("reactApp")
 )
```

This would display "Counter Value: 1" on the screen. 

## State

What if we wanted to update our counter value? We could use state!

```jsx
class Counter extends React.Component {
    constructor(props){
        super(props)

        this.state = { count: props.initialCounterValue }

        setInterval(() => this.setState({count: this.state.count + 1}), 1000)
    }

    render(){
        return <div>
          <p>Counter Value: {this.state.count}</p>
        </div>
    }
}

```

This code sets the initial count to the intial counter value passed in as a prop. It then updates the state every second, incrementing the count. Everytime the state changes via `setState`, React will re-render the component. Try it!

## User interactions

Instead of updating every second, what if we had a button that a user could press to update the count? Simple: 

```jsx
class Counter extends React.Component {
    constructor(props){
        super(props)

        this.state = { count: props.initialCounterValue }
    }

    incrementCount(){
        this.setState({count: this.state.count + 1})
    }

    render(){
        return <div>
          <p>Counter Value: {this.state.count}</p>
          <button type="button" onClick={this.incrementCount.bind(this)}>+</button>
        </div>
    }
}
```


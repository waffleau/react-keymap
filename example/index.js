import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {
  KeymapProvider,
  withKeymaps,
} from '../src'

const KeyMap = {
  increment: 'w',
  decrement: 's',
}

class MyComponent extends Component {
  state = {
    counter: 0,
  };

  keymaps = {
    increment: () => this.increment(),
    decrement: () => this.decrement(),
  };

  decrement() {
    this.setState(prevState => ({ counter: prevState.counter - 1 }))
  }

  increment() {
    this.setState(prevState => ({ counter: prevState.counter + 1 }))
  }

  render() {
    return (
      <div>
        <p>Use 'W' and 'S' to increment/decrement</p>
        <h1>Counter: {this.state.counter}</h1>
      </div>
    );
  }
}

const MyKeymappedComponent = withKeymaps(MyComponent)

class App extends Component {
  render() {
    return (
      <KeymapProvider mappings={KeyMap}>
        <MyKeymappedComponent />
      </KeymapProvider>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

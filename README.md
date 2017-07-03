# React Keymap

Keymapping for React wrapping the Mousetrap library.

## Installation

Add the package to your project:

```
npm install --save react-feature-gate
yarn add react-keymap
```

## Usage

First, you need to set up the provider at the top level of your component hierarchy:

```
const KeyMap = {
  'firstAction': 'ctrl+m',
  'second.action': ['ctrl+k', 'command+k'],
  'thirdAction': ['a'],
  fourthAction: 'alt+m'
}

<RootComponent>
  <KeymapProvider mappings={KeyMap}>
    <!-- Children -->
  </KeymapProvider>
</RootComponent>
```

You can then manage key mappings within your components through the `withKeymaps` wrapper function.

```
import React, { Component } from 'react';

class MyComponent extends Component {
  keymaps = {
    firstAction: () => this.handleFirstAction(),
    'second.action': () => this.handleSecondAction(),
    fourthAction: this.handleFourthAction.bind(this)
  }

  // -- OR --

  getKeymaps() {
    return {
      firstAction: () => this.handleFirstAction(),
      'second.action': () => this.handleSecondAction(),
      fourthAction: this.handleFourthAction.bind(this)
    }
  }

  handleFirstAction() {
    ...
  }

  handleSecondAction() {
    ...
  }

  handleFourthAction() {
    ...
  }

  render() {
    return (
      ...
    )
  }
}

export default withKeymaps(MyComponent)
```

You don't have to subscribe to every action you define, just the ones you care about in the particular component.

For information about key bindinsgs, view [The Mousetrap documentation](https://craig.is/killing/mice).


### Example

```
yarn run example
open http://localhost:8080/example
```

// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function withKeymaps(WrappedComponent: any) {
  return class extends Component {
    
    static contextTypes = {
      subscribeKeymap: PropTypes.func.isRequired,
      unsubscribeKeymap: PropTypes.func.isRequired,
    };

    _keymaps: Object = {}

    componentWillUnmount() {
      const { unsubscribeKeymap } = this.context;

      const keymaps = this._keymaps
      const eventNames = Object.keys(this._keymaps);

      eventNames.forEach(eventName => {
        unsubscribeKeymap(eventName, keymaps[eventName]);
      });
    }

    bindKeymaps = (node: any) => {
      const { subscribeKeymap } = this.context;
      const keymaps = this.getKeymaps(node)
      const eventNames = Object.keys(keymaps);

      eventNames.forEach(eventName => {
        subscribeKeymap(eventName, keymaps[eventName]);
      });

      this._keymaps = keymaps
    };

    getKeymaps(node: any): Object {
      let keymaps = node.keymaps

      if (!keymaps && !node.getKeymaps) {
        console.warn(`Component ${WrappedComponent.name} does not define getKeymaps method`)
        return {}
      }

      if (!keymaps) {
        keymaps = node.getKeymaps();
      }

      if (!keymaps) {
        console.warn(`Attempted to wrap component ${WrappedComponent.name} using withKeymaps, but it doesn't define any keymaps`)
        return {}
      }

      return keymaps
    }

    render() {
      return <WrappedComponent ref={this.bindKeymaps} {...this.props} />;
    }
  };
}

export default withKeymaps;

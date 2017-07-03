// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function withKeymaps(WrappedComponent: any) {
  return class extends Component {
    static contextTypes = {
      subscribeKeymap: PropTypes.func.isRequired,
    };

    bindKeymaps = (node: any) => {
      const { subscribeKeymap } = this.context;
      const keymaps = node.keymaps;

      if (keymaps) {
        const eventNames = Object.keys(keymaps);

        eventNames.forEach(eventName => {
          subscribeKeymap(eventName, keymaps[eventName]);
        });
      } else {
        console.warn(`Attempted to wrap component ${WrappedComponent.name} using withKeymaps, but it doesn't define any keymaps`)
      }
    };

    render() {
      return <WrappedComponent ref={this.bindKeymaps} {...this.props} />;
    }
  };
}

export default withKeymaps;

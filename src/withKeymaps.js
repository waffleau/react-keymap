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
      const handlers = node.keymaps;
      const eventNames = Object.keys(handlers);

      eventNames.forEach(eventName => {
        subscribeKeymap(eventName, handlers[eventName]);
      });
    };

    render() {
      return <WrappedComponent ref={this.bindKeymaps} {...this.props} />;
    }
  };
}

export default withKeymaps;

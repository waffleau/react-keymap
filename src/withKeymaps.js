// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function withKeymaps(WrappedComponent: any) {
  return class extends Component {
    static contextTypes = {
      subscribeToShortcuts: PropTypes.func.isRequired,
    };

    bindShortcuts = (node: any) => {
      const { subscribeToShortcuts } = this.context;
      const handlers = node.shortcuts;
      const eventNames = Object.keys(handlers);

      eventNames.forEach(eventName => {
        subscribeToShortcuts(eventName, handlers[eventName]);
      });
    };

    render() {
      return <WrappedComponent ref={this.bindShortcuts} {...this.props} />;
    }
  };
}

export default withKeymaps;

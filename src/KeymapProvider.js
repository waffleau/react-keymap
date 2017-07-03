// @flow

import React, { Component } from 'react'; // eslint-disable-line
import type { Children } from 'react';
import PropTypes from 'prop-types';
import Mousetrap from 'mousetrap';

export class KeymapProvider extends Component {
  _listeners: Object = {};

  static childContextTypes = {
    subscribeToShortcuts: PropTypes.func.isRequired,
  };

  props: {
    children: Children,
    mappings: Object
  };

  componentDidMount() {
    const { mappings } = this.props;
    const eventNames = Object.keys(mappings);

    eventNames.forEach(eventName => {
      const notifier = this.notify.bind(this, eventName);

      Mousetrap.bind(mappings[eventName], notifier);
    });
  }

  componentWillUnmount() {
    const { mappings } = this.props;
    const bindings = Object.values(mappings);

    bindings.forEach(binding => Mousetrap.unbind(binding));
  }

  getChildContext(): Object {
    return {
      subscribeToShortcuts: this.subscribe.bind(this),
    };
  }

  getListeners(eventName: string): Array<() => void> {
    return this._listeners[eventName] || [];
  }

  notify(eventName: string) {
    this.getListeners(eventName).forEach(listener => listener(eventName));
  }

  subscribe(eventName: string, listener: () => void) {
    if (typeof listener !== 'function') {
      console.warn(`Listener for ${eventName} is not a function`);
    }

    this._listeners[eventName] = [...this.getListeners(eventName), listener];
  }

  render() {
    return this.props.children;
  }
}

export default KeymapProvider;

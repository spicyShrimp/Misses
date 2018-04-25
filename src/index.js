import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/Navigator/App';

export default class Root extends Component {
  render() {
    return (
      <Provider store={ store }>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Misses', () => Root);
/**
 * @format
 */
import React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {createStore} from 'redux';
import Store from './src/redux/Store';
import {Provider} from 'react-redux';

const Feed = () => {
  return (
    <Provider store={Store}>
      <StatusBar
        animated={true}
        backgroundColor="#fff"
        barStyle={'dark-content'}
      />
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Feed);

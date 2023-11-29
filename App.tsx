import {LogBox, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StackNav from './src/navigators/StackNav';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <>
      <StackNav />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});

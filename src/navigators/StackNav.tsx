import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import Splash from '../screens/Splash/Splash';
import CreatePost from '../screens/CreatePost/CreatePost';
import Home from '../screens/Home/Home';

const Stack = createStackNavigator();

export default function StackNav() {
  const Screens = {
    Splash,
    Home,
    CreatePost,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {Object.entries({
          ...Screens,
        }).map(([name, component], index) => {
          return <Stack.Screen key={index} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Login, QRhome} from './screens';
import QRgenerator from './screens/QRgenerator';
import QRscanner from './screens/QRscanner';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import Tabs from './navigation/tabs';
import Qrhome from './screens/QRhome';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={Login} />

        {/* Tabs */}
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="User" component={Tabs} />
        {/* <Stack.Screen name="Scan" component={Scan} /> */}
        <Stack.Screen name="QRhome" component={Qrhome} />

        <Stack.Screen name="QR Generator" component={QRgenerator} />
        <Stack.Screen name="QR Scanner" component={QRscanner} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// Handles navigation for unauthenticated users
import React from 'react'; // Don't need?
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { loginName, registerName, welcomeName } from '../utils/constants';

import WelcomeScreen from '../screens/Welcome';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name={welcomeName} component={WelcomeScreen} />
        <Stack.Screen name={loginName} component={LoginScreen} />
        <Stack.Screen name={registerName} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
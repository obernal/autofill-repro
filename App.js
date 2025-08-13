import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SuccessScreen from './screens/SuccessScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ 
            title: 'Login',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen 
          name="Success" 
          component={SuccessScreen}
          options={{ 
            title: 'Success',
            headerBackTitleVisible: false,
            headerLeft: () => null, // Prevent going back to login after successful login
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
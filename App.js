// Import necessary libraries
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Import screens and components
import Home from './src/screen/Home';
import About from './src/screen/About';
import RecipeDetail from './src/components/RecipeDetail';
import SignupScreen from './src/screen/Signup';
import Login from './src/screen/Login';
import Profile from './src/components/Profile';
import Recipe from './src/components/Recipe';
import Loader from './src/components/Loader';

// Create the stack navigator
const Stack = createNativeStackNavigator();

// App component
export default function App() {
  const screenOptions = { headerShown: false };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Recipe" component={Recipe} />
        <Stack.Screen name="Loader" component={Loader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
Name: Neskines Otieno
*/

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

// navigation imports
import { createStackNavigator } from '@react-navigation/stack'

// screen imports
import LoginScreen from './screens/LoginScreen';
import CountriesListScreen from './screens/CountriesListScreen';
import CountryDetailsScreen from './screens/CountryDetailsScreen';
import FavoritesListsScreen from './screens/Favorites';

// create navigators
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Countries List" component={CountriesListScreen} />
        <Stack.Screen name="Country Details" component={CountryDetailsScreen} />   
        <Stack.Screen name="Favorites" component={FavoritesListsScreen} />     
      </Stack.Navigator>
    </NavigationContainer>
  );
}



//import { store } from './store/configureStore'
import HomeScreen from './screens/HomeScreen';
import ViewEditScreen from './screens/ViewEditScreen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';

const Stack = createStackNavigator();

export default function Main() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            // options={{ 
            //     title: 'Мои заметки'
            // }} 
            options={({ navigation, route }) => ({title: 'Мои заметки' })}
        />
        <Stack.Screen 
            name="ViewEdit" 
            component={ViewEditScreen} 
            //options={({ route }) => ({ title:  })}
            options={({ navigation, route }) => ({ title: 'Имя заметки' })}
            //options={{ title: 'Мои ejkg' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthScreen from './screens/AuthScreen';
import ListScreen from './screens/ListScreen';
import ItemScreen from './screens/ItemScreen';
import CommentScreen from './screens/CommentScreen';
import FavScreen from './screens/FavScreen';
import ProfileScreen from './screens/ProfileScreen';
import "./ignoreWarnings";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="List" 
          component={ListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Item" 
          component={ItemScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Comment" 
          component={CommentScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Favourites" 
          component={FavScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{headerShown: false}}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

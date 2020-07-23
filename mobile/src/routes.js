import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Feed from './pages/Feed';
import New from './pages/New';

import logo from './assets/logo.png';

const Stack = createStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      // screenOptions={{ headerShown: false }}
      screenOptions={{
        headerTintColor: '#000',
        headerTitle: <Image style={{resizeMode: 'stretch'}} source={logo} />,
        headerTitleAlign: 'center',
        headerTitleStyle: {height: 40, alignSelf: 'center'},
        headerBackTitleVisible: false,
      }}
      mode="modal">
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
  );
}

export default Routes;

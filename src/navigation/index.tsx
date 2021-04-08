import React from 'react';
// import { moduleName } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TossFormPage from '../pages/TossForm';
import TossAfterSubmit from '../pages/TossAfterSubmit';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TossFormPage" component={TossFormPage} />
      <Stack.Screen name="TossAfterSubmit" component={TossAfterSubmit} />
    </Stack.Navigator>
  );
};

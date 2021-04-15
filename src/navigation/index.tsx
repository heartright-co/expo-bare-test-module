import React from 'react';
// import { moduleName } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TossFormPage from '../pages/TossForm';
import TossAfterSubmit from '../pages/TossAfterSubmit';
import InAppPurchase from '../pages/InAppPurchase';
import ContactPage from '../pages/Contact/ContactPage';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="TossNavigator" component={TossNavigator} />
      <BottomTab.Screen
        name="InAppPurchaseNavigator"
        component={InAppPurcahseNavigator}
      />
      <BottomTab.Screen name="ContactNavigator" component={ContactNavigator} />
    </BottomTab.Navigator>
  );
};

const TossNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TossFormPage" component={TossFormPage} />
      <Stack.Screen name="TossAfterSubmit" component={TossAfterSubmit} />
    </Stack.Navigator>
  );
};
const InAppPurcahseNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InAppPurchase" component={InAppPurchase} />
    </Stack.Navigator>
  );
};

const ContactNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ContactPage" component={ContactPage} />
    </Stack.Navigator>
  );
};

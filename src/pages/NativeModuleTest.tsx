import React from 'react';
import { View, Text, Button, NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

export default function NativeModuleTest() {
  const onPress = () => {
    CalendarModule.createCalendarEvent('testName', 'testLocation');
  };
  return (
    <View>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </View>
  );
}

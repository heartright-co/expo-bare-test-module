import React from 'react';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';

const { CalendarModule } = NativeModules;

export default function App() {
  const onPress = () => {
    CalendarModule.createCalendarEvent('testName', 'testLocation');
  };
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

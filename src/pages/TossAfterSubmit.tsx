import React from 'react';
import { View, Text, Button, AppState } from 'react-native';

export default function TossAfterSubmit({ navigation, route }) {
  const { AppStateWatcher } = route.params;
  const onClick = () => {
    AppStateWatcher.removeOnChangeListener();
    navigation.goBack();
  };
  return (
    <View>
      <Text>Did you submitted</Text>
      <Button title="yes" onPress={onClick} />
      <Button title="no" onPress={onClick} />
    </View>
  );
}

import React from 'react';
import { View, Text, Button } from 'react-native';

export default function TossAfterSubmit({ navigation }) {
  const onClick = () => {
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

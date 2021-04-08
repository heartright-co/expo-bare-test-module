import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

export default function TossForm({ navigation }) {
  const defaultApiKey = 'dcf102a946024eafb1c3d61cbdba3c47';
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [bankName, setBankName] = useState('기업');
  const [bankAccount, setBankAccount] = useState('21604828802016');
  const [amount, setAmount] = useState('15000');
  const [message, setMessage] = useState('토스입금버튼');

  const tossLinkUrl = 'https://toss.im/transfer-web/linkgen-api/link';
  const tossBody = {
    apiKey,
    bankName,
    bankAccountNo: bankAccount,
    amount,
    message,
  };

  const directSchema = `supertoss://send?bank=${bankName}&accountNo=${bankAccount}&origin=linkgen&amount=${amount}&msg=${message}`;

  const onSubmitHandler = async () => {
    // This is not work on other banks and accountNo
    // const res = await axios.post(tossLinkUrl, tossBody);
    // if (res.data.resultType === 'SUCCESS') {
    //   const scheme = res.data.success.scheme;
    //   Linking.openURL(scheme);
    // }
    Linking.openURL(directSchema);
    navigation.navigate('TossAfterSubmit');
  };

  return (
    <ScrollView>
      <Text style={styles.text}>apiKey</Text>
      <TextInput style={styles.input} value={apiKey} onChangeText={setApiKey} />
      <Text style={styles.text}>bankName</Text>
      <TextInput
        style={styles.input}
        value={bankName}
        onChangeText={setBankName}
      />
      <Text style={styles.text}>bankAccount</Text>
      <TextInput
        style={styles.input}
        value={bankAccount}
        onChangeText={setBankAccount}
      />
      <Text style={styles.text}>amount</Text>
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} />
      <Text style={styles.text}>message</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
      />
      <Button onPress={onSubmitHandler} title="go toss" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: { marginVertical: 10 },
  input: {
    borderBottomWidth: 1,
  },
});

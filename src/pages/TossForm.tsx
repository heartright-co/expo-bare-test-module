import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  Platform,
  AppState,
} from 'react-native';
import axios from 'axios';
import * as Linking from 'expo-linking';

import { createAppStateChangeWatcher } from '../utils/pages/AppStateService';

export default function TossForm({ navigation }) {
  const defaultApiKey = 'dcf102a946024eafb1c3d61cbdba3c47';
  const [apiKey, setApiKey] = useState(defaultApiKey);
  const [bankName, setBankName] = useState('기업');
  const [bankAccount, setBankAccount] = useState('21604828802016');
  const [amount, setAmount] = useState('15000');
  const [message, setMessage] = useState('토스입금버튼');

  const tossDirectSchema = `supertoss://send?bank=${bankName}&accountNo=${bankAccount}&origin=linkgen&amount=${amount}&msg=${message}`;

  const appStoreDirectUrl = `itms-apps://itunes.apple.com/app/토스/id839333328`;

  const playStoreDirectUrl =
    'https://play.google.com/store/apps/details?id=viva.republica.toss';

  const onChangeAppStateHandler = () => {
    navigation.navigate('TossAfterSubmit', { AppStateWatcher });
  };

  const AppStateWatcher = createAppStateChangeWatcher({
    onChangeAppState: onChangeAppStateHandler,
  });

  const onSubmitHandler = async () => {
    // This not work on other banks and accountNo
    // const tossLinkUrl = 'https://toss.im/transfer-web/linkgen-api/link';
    // const tossBody = {
    //   apiKey,
    //   bankName,
    //   bankAccountNo: bankAccount,
    //   amount,
    //   message,
    // };
    // const res = await axios.post(tossLinkUrl, tossBody);
    // if (res.data.resultType === 'SUCCESS') {
    //   const scheme = res.data.success.scheme;
    //   Linking.openURL(scheme);
    // }

    // Toss 앱 내부적으로 copy 된 텍스트를 바로 송금으로 진행하는 기능이있는데,
    // 앱 설치후 바로 송금이 진행되게 하려면 위 텍스트 들을 copy 해서 휴대폰 내부 clipboard 에 저장하는 것도 좋을듯.
    try {
      const canOpenUrl = await Linking.openURL(tossDirectSchema);
      if (canOpenUrl) {
        AppStateWatcher.addOnChangeListener();
      }
    } catch (error) {
      console.log(`error`, error);
      if (Platform.OS === 'ios') {
        await Linking.openURL(appStoreDirectUrl);
      } else {
        await Linking.openURL(playStoreDirectUrl);
      }
    }
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

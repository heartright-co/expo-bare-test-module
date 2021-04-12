import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  connectAsync,
  getProductsAsync,
  disconnectAsync,
} from 'expo-in-app-purchases';

interface Props {}

const InAppPurchase = (props: Props) => {
  const [user, setUser] = useState({
    name: 'youngjin',
    subscription: undefined,
  });

  const [products, setProducst] = useState([]);

  const items = Platform.select({
    ios: ['org.name.pnuubareworklfow2.sub1'],
    android: ['sub_1'],
  });

  const connectPurchase = async () => {
    const history = await connectAsync();
    console.log(`history`, history);
  };

  const setInAppPurchase = async () => {
    // const connectRes = await connectAsync();
    // console.log(`connectRes`, connectRes);

    const { responseCode, results } = await getProductsAsync(items);
    console.log(`results`, results);

    setProducst(results);
  };

  useEffect(() => {
    connectPurchase();
    return () => {
      disconnectAsync();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>InappPurchase happenning!!!</Text>
        <Button title="Show Products" onPress={setInAppPurchase} />
        <Text>{JSON.stringify(products, null, 2)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default InAppPurchase;

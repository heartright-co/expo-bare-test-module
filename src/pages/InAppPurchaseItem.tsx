import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Purchases from 'react-native-purchases';

export default function InAppPurchaseItem({ item }) {
  const { title, price_string } = item.product;
  const [isBuying, setIsBuying] = useState(false);

  const onPressBuyHandler = async () => {
    try {
      setIsBuying(true);
      const response = await Purchases.purchasePackage(item);

      console.log(`response`, response);
      const { purchaserInfo, productIdentifier } = response;

      if (
        typeof purchaserInfo.entitlements.active.subscription_1 !== 'undefined'
      ) {
        console.log('unlock the product!');
      }
    } catch (e) {
      if (!e.userCancelled) {
        console.log('error', e);
      } else {
        console.log('userCanceled!');
      }
    }
    setIsBuying(false);
  };
  return isBuying ? (
    <Text>Processing...</Text>
  ) : (
    <View>
      <Text>{title}</Text>
      <Text>{price_string}</Text>
      <View style={styles.buttonContainer}></View>
      <Button title="Buy" onPress={onPressBuyHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {},
  buttonContainer: {},
});

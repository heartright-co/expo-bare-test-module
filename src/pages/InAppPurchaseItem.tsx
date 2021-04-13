import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {purchaseItemAsync} from 'expo-in-app-purchases'

export default function InAppPurchaseItem({item}) {
  return (
    <View key={item.productId}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Price: {item.price}</Text>
      <Text>Currency Code: {item.priceCurrencyCode}</Text>
      <Text>Price Amount Micros: {item.priceAmountMicros}</Text>
      <Text>Product ID: {item.productId}</Text>
      <Text>Type: {item.type}</Text>
      <Text>Subscription Period: {item.subscriptionPeriod}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Buy" onPress={() => purchaseItemAsync(item.productId)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemTitle: {},
  buttonContainer: {},
});

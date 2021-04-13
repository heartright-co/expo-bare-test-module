import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import Purchases from 'react-native-purchases';

import InAppPurchaseItem from './InAppPurchaseItem';

export default function InAppPurchase() {
  const [items, setItems] = useState([]);

  const [offerings, setOffering] = useState({});

  const [currentPurchase, setCurrentPurchase] = useState({});

  const initProducts = async () => {
    const offerings = await Purchases.getOfferings();
    console.log(`offerings`, offerings);
    console.log(`offerings.current`, offerings.current);
    setOffering(offerings);
    if (
      offerings.current !== null &&
      offerings.current.availablePackages.length !== 0
    ) {
      setItems(offerings.current.availablePackages);
    }
  };

  useEffect(() => {
    initProducts();
  }, []);

  const getCurrentPurchaseInfoHandler = async () => {
    const purchaserInfo = await Purchases.getPurchaserInfo();
    console.log(`purchaseInfo`, purchaserInfo);
    setCurrentPurchase(purchaserInfo);
    if (
      typeof purchaserInfo.entitlements.active.subscription_1 !== 'undefined'
    ) {
      console.log('subscribing!');
      // setCurrentPurchase(purchaserInfo);
    }
  };

  return (
    <ScrollView>
      <Text>Products</Text>
      {items.map((item) => (
        <InAppPurchaseItem item={item} />
      ))}
      {/* <Text>{JSON.stringify(items, null, 2)}</Text> */}
      {/* <Text>{JSON.stringify(offerings, null, 2)}</Text> */}
      <View style={{ marginTop: 10 }}>
        <Button
          title="Get current Purchase"
          onPress={getCurrentPurchaseInfoHandler}
        />
      </View>
      <Text>{JSON.stringify(currentPurchase, null, 2)}</Text>
    </ScrollView>
  );
}

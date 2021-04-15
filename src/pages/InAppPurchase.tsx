import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import Purchases from 'react-native-purchases';
import { useFocusEffect } from '@react-navigation/native';

import InAppPurchaseItem from './InAppPurchaseItem';

export default function InAppPurchase() {
  const [items, setItems] = useState([]);
  const [isSubscriber, setIsSubscriber] = useState(false);

  const [offerings, setOffering] = useState({});

  const [restore, setRestore] = useState(null);

  const [currentPurchase, setCurrentPurchase] = useState({});

  const onChangePurchaseInfohandler = (info) => {
    console.log(`info`, info);
  };

  useEffect(() => {
    Purchases.addPurchaserInfoUpdateListener(onChangePurchaseInfohandler);
    return () => {
      Purchases.removePurchaserInfoUpdateListener(onChangePurchaseInfohandler);
    };
  }, []);

  const getIsUserActiveSubscribing = async () => {
    const purchaserInfo = await Purchases.getPurchaserInfo();
    if (
      typeof purchaserInfo.entitlements.active.subscription_1 !== 'undefined'
    ) {
      console.log('subscription active!');

      return true;
    } else {
      console.log('subscription not active');
      return false;
    }
  };

  const setOfferings = async () => {
    const offerings = await Purchases.getOfferings();

    setOffering(offerings);
    if (
      offerings.current !== null &&
      offerings.current.availablePackages.length !== 0
    ) {
      setItems(offerings.current.availablePackages);
    }
  };

  const initProducts = async () => {
    console.log('init product!');
    const isSubscriber = await getIsUserActiveSubscribing();
    setIsSubscriber(isSubscriber);

    await setOfferings();
  };

  const restorePurchaseHandler = async () => {
    const restore = await Purchases.restoreTransactions();
    console.log(`restore`, restore);
    setRestore(restore);
  };

  useFocusEffect(
    useCallback(() => {
      initProducts();
    }, [])
  );

  const getCurrentPurchaseInfoHandler = async () => {
    const purchaserInfo = await Purchases.getPurchaserInfo();
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
      <Text>Subscription : {isSubscriber ? 'yes' : 'no'}</Text>
      {items.map((item) => (
        <InAppPurchaseItem key={item.product.title} item={item} />
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
      <View style={{ marginTop: 10 }}>
        <Button
          title="Restore last Purchase"
          onPress={restorePurchaseHandler}
        />
      </View>
      <Text>{JSON.stringify(restore, null, 2)}</Text>
    </ScrollView>
  );
}

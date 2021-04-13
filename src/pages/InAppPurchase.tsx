import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import {
  connectAsync,
  getProductsAsync,
  disconnectAsync,
  IAPResponseCode,
  InAppPurchase,
  IAPItemDetails,
  setPurchaseListener,
  finishTransactionAsync,
  getPurchaseHistoryAsync,
  getBillingResponseCodeAsync,
} from 'expo-in-app-purchases';
import InAppPurchaseItem from './InAppPurchaseItem';

interface Props {}

const packageName = 'com.pnuubareworkflow';

const myApiKey =
  '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxXyJJOHvt0k6L\nL/eX6rHRB+6QYqHL+wVtL57h3PDExJNptmEoox1GX4Ppu9g22nZwjNDrd8DwRrXB\nHntgnS5/Z7/6Y+6mqKMkRHIB4wqBMe/8gO7XaGbvN3La0Mjf6dOynu1l79KocUyi\nRo2ydagw+csdp8aFJ6h/+WGDf2ie8fMgiYaqWHdc3CreQejUaO5+DJP1J3Am24th\nZhxAlxeCBxrOXj/g2HbtAgQ3ZYS5wRvDUsQwEkzRwKyVIhkeQ0+B3bBbhTlDAHiX\n+mHKWEeHhBk8UFpzUFZkeaUAakoB8oNxzPWJfQuWlLT6ext19VQaaAB0vvD7ftxQ\nAxLtQz8xAgMBAAECggEACjr2e0qquzjaFuUZXsXGo8vVUradpmpAEeAhRd28dVzx\nM7O1PubJlXmE3kJbYi6PjkZQ9oPduP4bFZxweU4XlHmjdQm2hh5L6peYC8vQm0sK\nEIJPRFVdOob0NPK940xVTYQlJTAD8ns2dFWlbpmirdB6iqdWp+91pIv5t9/tZN1v\nEp7Ak/HuU5MopLbh0ThiROV/u+aSAGX9hDRX62KLQEMidsh4A4p2/aCgUwrzQGuy\np0iwrZ7YiBFPK7ZAMJLLoDxIj7ON4IE+HSrbzxL02zGHStDGrvGoznQT/9eYTr+p\n5et3B/Q9zMMrL3YgbBVi3J4dh/JEFvgNAG3Y3Kb7kQKBgQDd0SbZFHcHDVxyX6b0\nIUr1iDVI4jqAfmNDnrjU7U9u7BEWQMJlqISPXzrmUP3wTfYUtSPwKjDbIgetSiUJ\nHmsVb7KIZg8t1SiIu3/RSQa6eeqL1iGjN4FGUqH21VFy4H48hb8q7qucw9rFlbcq\nxL0HtOc0WBbbuzbRS5cDEYPYZwKBgQDMtJQJPNsN3z71/1CO1aSk5Q+Y/4kdx+UN\nXlFvb9QTrANgzMz3ef0Lk8N2ga3btdHc3THPiDcsaOSp4/NRGEtYejM6puR2+N/i\n9ztg94OsD5sCZ4hILw2oTrwnRAwZEkkpBBJVEuA2rdGBxaiWVUM0sUnuGwuALDmv\n9mnOrFnMpwKBgF0/0uQJfWxiio2udoJFCL0lsLjeGhfwigxgSnWA+ha4eQpw2Qhh\nirC3KQyv2cFPFPdpmx0Yr4c/zBhmhiFKP1w4o8ZBmXn8FVk98aLq30A/hoGY2HVE\nHT2R+XLKBL6Vb5xD4bTLtytlDrBnmyQIpyr5OwU/TwS6tHXSID7y+wlbAoGAUbU2\nbaWDzjqw1+IMFqdCK6temXROF7wFOlvOZ4ucfCmpw4abvaBMl8VoPLIwYkVluiH0\nUuENHMXVl9Zr9Y+b63oDXsLk6HQYcXC7m83QGeq0tbX7mMxnSCn9QjMQHSXGW//L\nDXgWVNz2hjUOQMtRowOs/cR/x65fbFQQEbWLtnsCgYBibZe2JTCxXQi3CWtSB8fv\n2HKae2U63vYePUTsaj2PDgSZVU8wuG8vUx4p+Dwg9Spp6VE4EtvChukfmT4MCuBL\npTYhF09q/hO9dDpurOsheReDxE/QB2PNlZlqcbLeJgmUuRnipFDgWe546eG54y31\nhVkUw3pT8yIQsZcbqT2wuw==\n-----END PRIVATE KEY-----\n';

const InAppPurchasePages = (props: Props) => {
  const [user, setUser] = useState({
    name: 'youngjin',
    subscription: undefined,
  });

  const [products, setProducts] = useState<(InAppPurchase | IAPItemDetails)[]>(
    []
  );
  const [history, setHistory] = useState([]);
  const [subscriptionStatus, setSubscriptionStatus] = useState();
  const [responseCode, setResponseCode] = useState(0);

  const loadInAppPurchaseProducts = async () => {
    const items = Platform.select({
      ios: ['org.name.pnuubareworklfow2.sub1'],
      android: ['org.name.pnuubareworkflow.sub1'],
    });

    await connectIfNotConnected();

    const { responseCode, results } = await getProductsAsync(items);
    if (responseCode === IAPResponseCode.OK) {
      setProducts(results);
      // console.log(`history from load`, loadedHistory);
    }

    setPurchaseListener(({ responseCode, results, errorCode }) => {
      if (responseCode === IAPResponseCode.OK) {
        for (const purchase of results) {
          console.log(`Successfully purchased ${purchase.productId}`);
          if (!purchase.acknoledged) {
            finishTransactionAsync(purchase, true);
          }
        }
      } else if (responseCode === IAPResponseCode.USER_CANCELED) {
        console.log('userCanceled!');
      } else {
        console.warn(
          `Something went wrong with the purchase. Received response code ${responseCode} and errorCode ${errorCode}`
        );
      }
    });
  };

  const getPurchaseSubscriptions = async () => {
    const subscriptionId = history[0].productId;
    const token = history[0].purchaseToken;
    console.log(`subscriptionId, token`, subscriptionId, token);

    const response = await axios
      .get(
        `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptions/${subscriptionId}/tokens/${token}?key=${myApiKey}`
      )
      .catch((error) => {
        console.log(`error on getSubscription status`, error);
      });
    return response;
  };

  const onShowHsitoryHandler = async () => {
    const { responseCode, results } = await getPurchaseHistoryAsync(true);
    console.log(`results`, results);
    if (responseCode === IAPResponseCode.OK) {
      setHistory(results);
    }
  };

  const onShowSubscriptionStatus = async () => {
    const response = await getPurchaseSubscriptions;
    setSubscriptionStatus(response);
  };

  useEffect(() => {
    loadInAppPurchaseProducts();
    return () => {
      disConnectIfConnected();
    };
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Products</Text>
        {products.map((item) => (
          <InAppPurchaseItem item={item} />
        ))}
        <Button title="Show history" onPress={onShowHsitoryHandler} />
        <Text>{JSON.stringify(history, null, 2)}</Text>

        <Button
          title="Show subscription Status"
          onPress={onShowSubscriptionStatus}
        />
        <Text>{JSON.stringify(subscriptionStatus, null, 2)}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default InAppPurchasePages;

const connectIfNotConnected = async () => {
  const billingResponseCode = await getBillingResponseCodeAsync();

  if (billingResponseCode === IAPResponseCode.ERROR) {
    console.log('connect');
    await connectAsync();
  }
};

const disConnectIfConnected = async () => {
  const billingResponseCode = await getBillingResponseCodeAsync();
  if (billingResponseCode === IAPResponseCode.OK) {
    console.log('diconnect');
    await disconnectAsync();
  }
};

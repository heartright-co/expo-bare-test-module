import { useEffect } from 'react';
import Purchases from 'react-native-purchases';

const revenueCatPublicKey = 'ouGHEazHdDEPJxHagkSxXeQQZiVUOdIy';
const userId = 'tester_user_id5';

export const useConfigurePurchase = () => {
  const initPurchase = () => {
    console.log('init revenueCat');

    Purchases.setDebugLogsEnabled(true);
    Purchases.setup(revenueCatPublicKey);
  };

  useEffect(() => {
    initPurchase();
  }, []);
};

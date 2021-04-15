import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function ContactPage() {
  const [contacts, setContacts] = useState();

  const requestContactsWithPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    const shoudlValidPhoneNumber = (number) => {
      const trimedNumber = number.split('-').join();
      // '010-(x)xxx-xxxx' 만지원 https://namu.wiki/w/010
      return (
        trimedNumber.length === 11 ||
        (trimedNumber.length === 10 && trimedNumber.startsWith('010'))
      );
    };

    const shouldNotBlockedOnKaKao = (name) => {
      return !name.startsWith('#');
    };

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync();

      if (data.length > 0) {
        const mappedContacts = data
          .filter((oneData) => {
            return (
              oneData.phoneNumbers &&
              oneData.phoneNumbers.length > 0 &&
              shoudlValidPhoneNumber(oneData.phoneNumbers[0].number) &&
              shouldNotBlockedOnKaKao(oneData.name)
            );
          })
          .map((oneData) => ({
            name: oneData.name,
            phonNumbers: oneData.phoneNumbers[0].number,
          }));
        setContacts(mappedContacts);
      }
    }
  };

  useEffect(() => {
    requestContactsWithPermission();
  }, []);

  return (
    <ScrollView>
      <Text>Contacts</Text>
      {contacts && <Text>Total : {contacts.length}</Text>}
      {contacts && <Text>{JSON.stringify(contacts, null, 2)}</Text>}
    </ScrollView>
  );
}

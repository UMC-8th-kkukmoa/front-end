import React from 'react';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CouponsIcon from '../../asset/credit-card.svg';
import HomeIcon from '../../asset/home.svg';
import StoresIcon from '../../asset/map-pin.svg';
import ProfileIcon from '../../asset/user.svg';

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Tabs>
        <TabSlot />
        <TabList>
          <TabTrigger name="home" href="/">
            <HomeIcon fill="orange" width={24} height={24} />
          </TabTrigger>
          <TabTrigger name="stores" href="/stores">
            <StoresIcon stroke="orange" width={24} height={24} />
          </TabTrigger>
          <TabTrigger name="coupons" href="/coupons">
            <CouponsIcon stroke="orange" width={24} height={24} />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile">
            <ProfileIcon fill="orange" width={24} height={24} />
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

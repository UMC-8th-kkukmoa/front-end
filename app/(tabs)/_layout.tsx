import React from 'react';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, router } from 'expo-router';
import CouponsIcon from '../../src/assets/images/credit-card.svg';
import HomeIcon from '../../src/assets/images/home.svg';
import StoresIcon from '../../src/assets/images/map-pin.svg';
import ProfileIcon from '../../src/assets/images/user.svg';
import colors from '../../src/design/colors';

const styles = StyleSheet.create({
  tabIcon: {
    padding: 12,
    marginTop: 8,
  },
  tabIconSelected: {
    backgroundColor: colors.light.main,
    borderRadius: '100%',
  },
  tabLayout: {
    justifyContent: 'space-around',
  },
  mainButton: {
    backgroundColor: colors.light.white,
    borderRadius: '100%',
    padding: 5,
    marginTop: -16,
    alignSelf: 'center',
    shadowColor: '#6C313126',
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  mainButtonInner: {
    backgroundColor: colors.light.sub,
    borderRadius: '100%',
    padding: 6,
  },
  logoIcon: {
    width: 48,
    height: 48,
  },
});

const logoIcon = require('../../src/assets/images/logo.png');

const mainButtonSymbol = Symbol('mainButton');

type TabItem = {
  name: 'home' | 'stores' | 'coupons' | 'profile';
  uri: string;
  icon: React.ComponentType<{ color: string; width: number; height: number }>;
};

const tabs: Array<typeof mainButtonSymbol | TabItem> = [
  { name: 'home', uri: '/', icon: HomeIcon },
  { name: 'stores', uri: '/stores', icon: StoresIcon },
  mainButtonSymbol,
  { name: 'coupons', uri: '/giftCard/GiftCardList', icon: CouponsIcon },
  { name: 'profile', uri: '/profile', icon: ProfileIcon },
];

function IconWrapper({ isSelected, children }: { isSelected: boolean; children: React.ReactNode }) {
  return <View style={[styles.tabIcon, isSelected && styles.tabIconSelected]}>{children}</View>;
}

function MainButton() {
  return (
    <TouchableOpacity>
      <View style={styles.mainButton}>
        <View style={styles.mainButtonInner}>
          <Image source={logoIcon} style={styles.logoIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Layout() {
  const pathname = usePathname();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Tabs>
        <TabSlot />
        <TabList style={styles.tabLayout}>
          {tabs.map((tab) => {
            if (tab === mainButtonSymbol) {
              return <MainButton key="mainButton" />;
            }

            if (tab.name === 'coupons') {
              const selected = pathname === tab.uri;
              const IconComponent = tab.icon;

              return (
                <TouchableOpacity key={tab.name} onPress={() => router.push(tab.uri)}>
                  <IconWrapper isSelected={selected}>
                    <IconComponent
                      color={selected ? colors.light.white : colors.light.main}
                      width={24}
                      height={24}
                    />
                  </IconWrapper>
                </TouchableOpacity>
              );
            }

            const selected = pathname === tab.uri;
            const IconComponent = tab.icon;

            return (
              <TabTrigger name={tab.name} href={tab.uri} key={tab.name}>
                <IconWrapper isSelected={selected}>
                  <IconComponent
                    color={selected ? colors.light.white : colors.light.main}
                    width={24}
                    height={24}
                  />
                </IconWrapper>
              </TabTrigger>
            );
          })}
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

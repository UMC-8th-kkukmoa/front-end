import React from 'react';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import CouponsIcon from '../../asset/credit-card.svg';
import HomeIcon from '../../asset/home.svg';
import StoresIcon from '../../asset/map-pin.svg';
import ProfileIcon from '../../asset/user.svg';
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
  },
  mainButtonInner: {
    backgroundColor: colors.light.sub,
    borderRadius: '100%',
    padding: 6,
  },
});

function IconWrapper({ isSelected, children }: { isSelected: boolean; children: React.ReactNode }) {
  return <View style={[styles.tabIcon, isSelected && styles.tabIconSelected]}>{children}</View>;
}

function MainButton() {
  return (
    <TouchableOpacity>
      <View style={styles.mainButton}>
        <View style={styles.mainButtonInner}>
          {/* TODO: logo */}
          <View
            style={{
              backgroundColor: colors.light.gray2,
              width: 48,
              height: 48,
              borderRadius: '100%',
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function Layout() {
  const pathname = usePathname();

  const homeSelected = pathname === '/';
  const storesSelected = pathname === '/stores';
  const couponsSelected = pathname === '/coupons';
  const profileSelected = pathname === '/profile';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Tabs>
        <TabSlot />
        <TabList style={styles.tabLayout}>
          <TabTrigger name="home" href="/">
            <IconWrapper isSelected={homeSelected}>
              <HomeIcon
                color={homeSelected ? colors.light.white : colors.light.main}
                width={24}
                height={24}
              />
            </IconWrapper>
          </TabTrigger>
          <TabTrigger name="stores" href="/stores">
            <IconWrapper isSelected={storesSelected}>
              <StoresIcon
                color={storesSelected ? colors.light.white : colors.light.main}
                width={24}
                height={24}
              />
            </IconWrapper>
          </TabTrigger>

          <MainButton />

          <TabTrigger name="coupons" href="/coupons">
            <IconWrapper isSelected={couponsSelected}>
              <CouponsIcon
                color={couponsSelected ? colors.light.white : colors.light.main}
                width={24}
                height={24}
              />
            </IconWrapper>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile">
            <IconWrapper isSelected={profileSelected}>
              <ProfileIcon
                color={profileSelected ? colors.light.white : colors.light.main}
                width={24}
                height={24}
              />
            </IconWrapper>
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

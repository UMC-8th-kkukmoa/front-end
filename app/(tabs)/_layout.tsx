import React from 'react';
import { TabList, Tabs, TabSlot, TabTrigger } from 'expo-router/ui';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, router } from 'expo-router';
import CouponsIcon from '../../src/assets/images/credit-card.svg';
import HomeIcon from '../../src/assets/images/home.svg';
import StoresIcon from '../../src/assets/images/map-pin.svg';
import ProfileIcon from '../../src/assets/images/user.svg';
import colors from '../../src/design/colors';

const styles = StyleSheet.create({
  tabLayout: {
    justifyContent: 'space-evenly',
    paddingBottom: 14,
    backgroundColor: colors.light.white,
    zIndex: 2,
  },
  tabIconSelected: {
    backgroundColor: colors.light.main,
    borderRadius: '100%',
  },
  tabIcon: {
    padding: 12,
    marginTop: 8,
  },
  topFadeOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 129,
    zIndex: 1,
  },
});

type TabItem = {
  name: 'home' | 'stores' | 'coupons' | 'profile';
  uri: string;
  icon: React.ComponentType<{ color: string; width: number; height: number }>;
};

const tabs: TabItem[] = [
  { name: 'home', uri: '/', icon: HomeIcon },
  { name: 'stores', uri: '/stores', icon: StoresIcon },
  { name: 'coupons', uri: '/giftCard/GiftCardList', icon: CouponsIcon },
  { name: 'profile', uri: '/profile', icon: ProfileIcon },
];

function IconWrapper({ isSelected, children }: { isSelected: boolean; children: React.ReactNode }) {
  return <View style={[styles.tabIcon, isSelected && styles.tabIconSelected]}>{children}</View>;
}

export default function Layout() {
  const pathname = usePathname();
  const isStoreTab = pathname === '/stores';

  return (
    <SafeAreaView
      edges={isStoreTab ? ['left', 'right', 'bottom'] : undefined}
      style={{
        flex: 1,
        backgroundColor: colors.light.white,
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        start={{ x: 0, y: 10 }}
        end={{ x: 0, y: 0 }}
        colors={[colors.light.shadow, 'rgba(0,0,0,0)']}
        style={[styles.topFadeOverlay, { bottom: 30 }]}
      />
      <Tabs>
        <TabSlot />
        <TabList style={styles.tabLayout}>
          {tabs.map((tab) => {
            // 이 페이지는 하단 탭 바가 보이지 않아야 하므로 router.push를 사용해 별도로 이동 처리함
            if (tab.name === 'coupons') {
              const selected = pathname === tab.uri || pathname.startsWith(`${tab.uri}/`);
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

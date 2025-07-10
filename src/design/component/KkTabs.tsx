import React from 'react';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#eee',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
});

export default function KkTabs() {
  return (
    <Tabs>
      <View style={styles.tabContent}>
        <TabSlot />
      </View>
      <TabList style={styles.tabBar}>
        <TabTrigger name="home" href="/">
          <Text style={styles.tabText}>Home</Text>
        </TabTrigger>
        <TabTrigger name="article" href="/article">
          <Text style={styles.tabText}>Article</Text>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

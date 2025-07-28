import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
  container: {
    height: 62,
    backgroundColor: colors.light.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,

    elevation: 4,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
  },
});

type HeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function Header({ title, onBackPress }: HeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

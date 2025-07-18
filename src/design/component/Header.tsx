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
    fontFamily: 'Pretendard-Medium',
  },
});

type HeaderProps = {
  title: string;
  onBackPress: () => void;
  shadow?: boolean;
};

export default function Header({ title, onBackPress, shadow }: HeaderProps) {
  return (
    <View
      style={[
        styles.container,
        shadow !== false && {
          elevation: 4,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 3,
        },
      ]}
    >
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

Header.defaultProps = {
  shadow: true,
};

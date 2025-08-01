import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors';
import ArrowBackIcon from '../../assets/images/arrow_back.svg';

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
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
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
        <ArrowBackIcon color={colors.light.black} width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

Header.defaultProps = {
  shadow: true,
};

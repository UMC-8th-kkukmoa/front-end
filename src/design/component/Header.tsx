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

    elevation: 4,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Pretendard-Medium',
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
        <ArrowBackIcon color={colors.light.black} width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

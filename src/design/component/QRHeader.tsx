import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors';
import ArrowBackIcon from '../../assets/images/arrow_back.svg';

const styles = StyleSheet.create({
  container: {
    height: 62,
    backgroundColor: colors.light.black_70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    zIndex: 5,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.light.white,
    fontFamily: 'Pretendard-Bold',
  },
});

type QRHeaderProps = {
  title: string;
  onBackPress: () => void;
};

export default function QRHeader({ title, onBackPress }: QRHeaderProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
        <ArrowBackIcon color={colors.light.white} width={24} height={24} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

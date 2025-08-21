import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { KkButton } from '../design/component/KkButton';

const logo = require('../assets/images/logo.png');

type ErrorScreenProps = {
  onRetry?: () => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#111827',
  },
});

export default function ErrorScreen({ onRetry }: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>문제가 발생했어요</Text>
      {onRetry ? (
        <KkButton label="다시 시도" type="primary" size="large" onPress={onRetry} />
      ) : null}
    </View>
  );
}

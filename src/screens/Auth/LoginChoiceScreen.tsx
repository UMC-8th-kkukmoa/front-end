import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { KkButton } from '../../design/component/KkButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 42,
    marginBottom: 70,
  },
});

const logoImage = require('../../assets/images/logo/LogoText2.png');

export default function LoginChoiceScreen() {
  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />

      <KkButton label="로그인" type="primary" size="large" onPress={() => {}} />
    </View>
  );
}

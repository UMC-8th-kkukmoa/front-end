import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import KkLoginTextbox from '../../design/component/KkLoginTextbox';
import { KkButton } from '../../design/component/KkButton';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 210,
    alignItems: 'center',
    backgroundColor: colors.light.white,
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 42,
    marginBottom: 70,
  },
  form: {
    alignItems: 'center',
    width: '100%',
    gap: 24,
    marginBottom: 74,
  },
  button: {
    width: '100%',
    paddingHorizontal: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 40,
    gap: 10,
  },
  signupText: {
    color: colors.light.black,
    fontSize: 14,
  },
  signupLink: {
    color: colors.light.main,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

const logoImage = require('../../assets/images/logo/LogoText2.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email && password;

  const handleLogin = () => {
    // 로그인 처리 로직
    console.log('로그인 버튼 클릭!');
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />

      <View style={styles.form}>
        <KkLoginTextbox
          label=""
          size="large"
          width={333}
          height={56}
          value={email}
          onChangeText={setEmail}
          placeholder="이메일 주소"
          type="email"
          variant={email ? 'primary' : 'secondary'}
          enabled={!!email}
          error={false}
        />
        <KkLoginTextbox
          label=""
          size="large"
          width={333}
          height={56}
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호"
          type="password"
          variant={password ? 'primary' : 'secondary'}
          enabled={!!password}
          error={false}
        />
      </View>

      <View style={styles.button}>
        <KkButton
          label="로그인"
          type={isValid ? 'primary' : 'disabled'}
          size="large"
          onPress={isValid ? handleLogin : () => {}}
          shadow
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>아직 꾹모아의 회원이 아니신가요? </Text>
        <TouchableOpacity onPress={() => {}}>
          {/* expo 네비게이션 사용 */}
          <Text style={styles.signupLink}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

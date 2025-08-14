import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { KkButton } from '../../design/component/KkButton';
import colors from '../../design/colors';
import handleKakaoLogin from '../../api/kakaoLogin';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  logo: {
    width: 100,
    height: 42,
    marginBottom: 50,
  },
  loginContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 40,
  },
  loginText: {
    color: colors.light.black,
    fontSize: 14,
  },
  loginLink: {
    color: colors.light.main,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    paddingHorizontal: 7,
    gap: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 60,
    gap: 120,
    alignItems: 'center',
  },
  logoSmall: {
    width: 42,
    height: 42,
    marginLeft: 4,
    alignSelf: 'center',
  },
});

const logoImage = require('../../assets/images/logo/LogoText2.png');
const naverImage = require('../../assets/images/logo/naverlogo.png');

export default function LoginChoiceScreen() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleKakaoLoginPress = async () => {
    const result = await handleKakaoLogin();
    console.log('💡 로그인 직후 result:', result);
    if (result !== null) {
      // ['auth', 'accessToken']을 invalidate 하면 useAuth()의 값이 바뀌면서 protected route로 메인 화면으로 이동하게 됨
      // noinspection ES6MissingAwait
      queryClient.invalidateQueries({ queryKey: ['auth', 'accessToken'] });
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} resizeMode="contain" />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>이미 회원이신가요?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/LoginScreen')}>
          <Text style={styles.loginLink}>로그인하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.button}>
        <KkButton
          label="카카오 로그인"
          type="primary"
          size="large"
          shadow
          onPress={handleKakaoLoginPress}
        />

        <KkButton
          label="이메일 가입"
          type="secondary"
          size="large"
          shadow
          onPress={() => router.push('/auth/AgreementScreen')}
        />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.loginText}>다른 방식으로 가입하기</Text>
        <Image source={naverImage} style={styles.logoSmall} resizeMode="contain" />
      </View>
    </View>
  );
}

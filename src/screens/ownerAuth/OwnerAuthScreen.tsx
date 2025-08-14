import React, { useMemo, useState } from 'react';
import { Alert, Image, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { KkButton } from '../../design/component/KkButton';
import KkTextbox from '../../design/component/KkTextbox';
import styles from './OwnerAuthScreen.style';
import { checkPublicRegistrationStatus, ownerLogin } from '../../api/owner';
import { saveTokens } from '../../utils/tokenStorage';
import useAuthStore from '../../store/useAuthStore';

const logoImage = require('../../assets/images/logo/LogoText2.png');

export default function OwnerAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const setRoles = useAuthStore((state) => state.setRoles);

  const loginMutation = useMutation({
    mutationFn: ownerLogin,
    onSuccess: async (data) => {
      const { accessToken, refreshToken, roles } = data.result;
      await saveTokens(accessToken, refreshToken);
      if (roles) {
        // TODO: ROLE_PENDING_OWNER 이라면 입점 신청이나 현황을 보여줘야 함
        setRoles(roles);

        if (roles.contains('ROLE_OWNER')) {
          router.replace('/owner/Dashboard');
        } else if (roles.contains('ROLE_PENDING_OWNER')) {
          router.replace('/owner/join');
        }
      }
    },
    onError: (error) => {
      // TODO
      console.error('Failed to login', error);
    },
  });

  const checkStatusMutation = useMutation({
    mutationFn: checkPublicRegistrationStatus,
    onSuccess: (data) => {
      // TODO
      console.log('Registration status:', JSON.stringify(data));
      Alert.alert('신청 상태', data.result.pending ? '신청 중' : '등록된 신청 없음');
    },
    onError: (error) => {
      console.error('Failed to check registration status', error);
      Alert.alert('오류', '신청 상태 확인에 실패했습니다.');
    },
  });

  const isLoginDisabled = useMemo(() => {
    return !email || !password;
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <KkTextbox
          label=""
          placeholder="이메일 주소"
          type="email"
          size="large"
          variant="secondary"
          value={email}
          onChangeText={setEmail}
          enabled
          error={false}
          style={styles.input}
        />
        <KkTextbox
          label=""
          placeholder="비밀번호"
          type="password"
          size="large"
          variant="secondary"
          value={password}
          onChangeText={setPassword}
          enabled
          error={false}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <KkButton
          label="로그인"
          type={isLoginDisabled ? 'disabled' : 'primary'}
          size="large"
          onPress={() => {
            loginMutation.mutate({ email, password });
          }}
          style={styles.loginButton}
          shadow
        />

        <View style={styles.joinButtonContainer}>
          <KkButton
            label="입점 신청하기"
            type="secondary"
            size="large"
            onPress={() => {
              router.push('/owner/join');
            }}
            shadow
          />

          <KkButton
            label="입점 신청현황 조회"
            type={isLoginDisabled ? 'disabled' : 'secondary'}
            size="large"
            onPress={() => {
              if (!isLoginDisabled) {
                checkStatusMutation.mutate({ email, password });
              }
            }}
            shadow
          />
        </View>
      </View>
    </View>
  );
}

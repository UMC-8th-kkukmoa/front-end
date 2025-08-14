import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import Header from '../../design/component/Header';
import styles from './SignUpScreen.style';
import {
  useCheckEmailMutation,
  useCheckNicknameMutation,
  useEmailRequestMutation,
  useSignUpMutation,
} from '../../hooks/signUpMutations';
import { SignUpRequest } from '../../types/auth.ts';

export default function SignUpScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [signupToken, setSignupToken] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [isNicknameUsed, setIsNicknameUsed] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isVerificationError, setIsVerificationError] = useState(false);
  const [isVerificationChecked, setIsVerificationChecked] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const checkNicknameMutation = useCheckNicknameMutation();
  const emailRequestMutation = useEmailRequestMutation();
  const checkEmailMutation = useCheckEmailMutation();
  const signUpMutation = useSignUpMutation();

  const handleBack = () => router.back();

  // 유효성 검사
  useEffect(() => {
    setIsEmailError(email !== '' && !/\S+@\S+\.\S+/.test(email));
  }, [email]);

  useEffect(() => {
    setIsNicknameUsed(false);
  }, [nickname]);

  useEffect(() => {
    setIsPasswordError(passwordConfirm !== '' && password !== passwordConfirm);
  }, [password, passwordConfirm]);

  // 닉네임 중복 확인
  const handleCheckNickname = async (): Promise<void> => {
    try {
      const exists = await checkNicknameMutation.mutateAsync(nickname);
      if (exists) {
        setIsNicknameUsed(true);
      } else {
        setIsNicknameUsed(false);
        Alert.alert('사용 가능', '사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '닉네임 확인 중 오류가 발생했습니다.');
    }
  };

  // 이메일 인증 요청
  const handleEmailRequest = async (): Promise<void> => {
    if (!email) {
      Alert.alert('이메일을 입력해주세요.');
      return;
    }
    try {
      await emailRequestMutation.mutateAsync(email);
      Alert.alert('인증메일 전송', '이메일로 인증번호가 전송되었습니다.');
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '이메일 전송 중 오류가 발생했습니다.');
    }
  };

  // 인증번호 입력 시 에러 초기화
  const handleVerificationChange = (text: string) => {
    setVerificationCode(text);
    setIsVerificationError(false);
    setIsVerificationChecked(false);
  };

  // 이메일 인증 확인
  const handleEmailVerify = async (): Promise<void> => {
    if (!email || !verificationCode) return;
    try {
      const res = await checkEmailMutation.mutateAsync({ email, code: verificationCode });
      if (res.signupToken) {
        setSignupToken(res.signupToken);
        Alert.alert('인증 성공', '이메일 인증이 완료되었습니다.');
        setIsVerificationError(false);
        setIsVerificationChecked(true);
      }
    } catch (error) {
      console.error(error);
      setIsVerificationError(true);
      setIsVerificationChecked(false);
    }
  };

  // 회원가입
  const handleSignUp = async (): Promise<void> => {
    if (!signupToken) {
      Alert.alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }
    if (!nickname || !date || !email || !password || !passwordConfirm) return;
    if (isNicknameUsed || isEmailError || isVerificationError || isPasswordError) return;

    const signupData: SignUpRequest = {
      signupToken,
      email,
      password,
      nickname,
      role: 'USER',
    };

    try {
      await signUpMutation.mutateAsync(signupData);
      Alert.alert('회원가입 완료', '회원가입이 완료되었습니다.');
      router.push('/auth/SignupCompleteScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Header title="회원가입" onBackPress={handleBack} shadow={false} />
      <ScrollView style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground} />
          <Text style={styles.progressText}>개인정보 입력</Text>
        </View>

        {/* 닉네임 입력 */}
        <View style={styles.form}>
          <View style={styles.smallbox}>
            <KkTextbox
              label="닉네임"
              size="small"
              value={nickname}
              onChangeText={setNickname}
              placeholder="한글, 영문, 숫자만 입력"
              type="text"
              variant={nickname ? 'secondary' : 'primary'}
              enabled={!!nickname}
              error={isNicknameUsed}
              required
            />
            {isNicknameUsed && <Text style={styles.message}>이미 사용중인 닉네임입니다.</Text>}
          </View>
          <View style={{ marginTop: 26.3 }}>
            <KkButton
              label="중복 확인"
              type={nickname && !isNicknameUsed ? 'primary' : 'disabled'}
              size="large"
              onPress={handleCheckNickname}
            />
          </View>
        </View>

        {/* 생년월일 입력 */}
        <View style={styles.form}>
          <KkTextbox
            label="생년월일"
            size="large"
            style={{ flex: 1 }}
            value={date}
            onChangeText={setDate}
            type="date"
            variant={date ? 'secondary' : 'secondary'}
            enabled
            error={false}
            required
          />
        </View>

        {/* 이메일 인증 */}
        <View style={styles.form}>
          <View style={styles.smallbox}>
            <KkTextbox
              label="이메일"
              size="small"
              value={email}
              onChangeText={setEmail}
              placeholder="이메일을 입력해주세요."
              type="email"
              variant={email ? 'secondary' : 'primary'}
              enabled={!!email}
              error={isEmailError}
              required
            />
            {isEmailError && <Text style={styles.message}>이메일 형식이 올바르지 않습니다.</Text>}
          </View>
          <View style={{ marginTop: 26.3 }}>
            <KkButton
              label="인증받기"
              type={email && !isEmailError ? 'primary' : 'disabled'}
              size="large"
              onPress={handleEmailRequest}
            />
          </View>
        </View>

        {/* 인증번호 입력 */}
        <View style={styles.form}>
          <View style={styles.smallbox}>
            <KkTextbox
              label="인증번호"
              size="small"
              value={verificationCode}
              onChangeText={handleVerificationChange}
              placeholder="인증번호를 입력해주세요."
              type="text"
              variant={verificationCode ? 'secondary' : 'primary'}
              enabled={!!verificationCode}
              error={isVerificationError && isVerificationChecked}
              required
            />
            {isVerificationError && !isVerificationChecked && (
              <Text style={styles.message}>올바르지 않은 인증번호입니다.</Text>
            )}
          </View>
          <View style={{ marginTop: 26.3 }}>
            <KkButton
              label="인증하기"
              type={verificationCode && !isVerificationError ? 'primary' : 'disabled'}
              size="large"
              onPress={handleEmailVerify}
            />
          </View>
        </View>

        {/* 비밀번호 입력 */}
        <View style={styles.form}>
          <KkTextbox
            label="비밀번호"
            size="large"
            style={{ flex: 1 }}
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호를 입력해주세요."
            type="text"
            variant={password ? 'secondary' : 'primary'}
            enabled={!!password}
            error={false}
            required
          />
        </View>

        {/* 비밀번호 확인 */}
        <View style={styles.form}>
          <View style={{ flex: 1, position: 'relative' }}>
            <KkTextbox
              label="비밀번호 확인"
              size="large"
              style={{ flex: 1 }}
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              placeholder="비밀번호를 입력해주세요."
              type="text"
              variant={passwordConfirm ? 'secondary' : 'primary'}
              enabled={!!passwordConfirm}
              error={isPasswordError}
              required
            />
            {isPasswordError && <Text style={styles.message}>비밀번호가 일치하지 않습니다.</Text>}
            {!!passwordConfirm && !isPasswordError && password === passwordConfirm && (
              <Text style={styles.messageSuccess}>비밀번호가 일치합니다.</Text>
            )}
          </View>
        </View>

        <KkButton
          style={styles.button}
          label="다음"
          type={
            nickname &&
            date &&
            email &&
            password &&
            passwordConfirm &&
            !isNicknameUsed &&
            !isEmailError &&
            !isVerificationError &&
            !isPasswordError
              ? 'primary'
              : 'disabled'
          }
          size="large"
          onPress={handleSignUp}
          shadow
        />
      </ScrollView>
    </SafeAreaView>
  );
}

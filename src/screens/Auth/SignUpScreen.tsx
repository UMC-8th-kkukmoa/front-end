import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import Header from '../../design/component/Header';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  progressBarContainer: {
    alignItems: 'center',
    padding: 23,
    marginBottom: 20,
  },
  progressBarBackground: {
    width: '100%',
    height: 15.8,
    borderRadius: 15,
    backgroundColor: colors.light.main,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 12.64,
    fontWeight: '600',
    color: colors.light.main,
  },
  headerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: colors.light.white,
    paddingHorizontal: 16,
  },
  smallbox: {
    flex: 1,
    marginRight: 16,
    position: 'relative',
  },
  form: {
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 36,
  },
  message: {
    position: 'absolute',
    left: 0,
    bottom: -18,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
    color: colors.light.main,
    fontSize: 12,
  },
  messageSuccess: {
    position: 'absolute',
    left: 0,
    bottom: -18,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
    color: colors.light.gray2,
    fontSize: 12,
  },
  button: {
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 70,
  },
});

export default function SignUpScreen() {
  const [nickname, setNickname] = useState('');
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailError, setIsEmailError] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerificationError, setIsVerificationError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordError, setIsPasswordError] = useState(false);

  // 유효성 검사 (api 연동 전 임시)
  useEffect(() => {
    setIsEmailError(email !== '' && !/\S+@\S+\.\S+/.test(email));
  }, [email]);

  useEffect(() => {
    setIsNicknameError(nickname !== '' && nickname.length < 2);
  }, [nickname]);

  useEffect(() => {
    setIsVerificationError(verificationCode !== '' && verificationCode.length < 6);
  }, [verificationCode]);

  useEffect(() => {
    setIsPasswordError(passwordConfirm !== '' && password !== passwordConfirm);
  }, [password, passwordConfirm]);

  return (
    <View style={styles.headerContainer}>
      <Header title="회원가입" onBackPress={() => {}} shadow={false} />

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
              error={isNicknameError}
              required
            />
            {isNicknameError && <Text style={styles.message}>이미 사용중인 닉네임입니다.</Text>}
          </View>
          <View style={{ marginTop: 26.3 }}>
            <KkButton
              label="중복 확인"
              type={nickname && !isNicknameError ? 'primary' : 'disabled'}
              size="large"
              onPress={() => {}}
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
              type={email ? 'primary' : 'disabled'}
              size="large"
              onPress={() => {}}
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
              onChangeText={setVerificationCode}
              placeholder="인증번호를 입력해주세요."
              type="text"
              variant={verificationCode ? 'secondary' : 'primary'}
              enabled={!!verificationCode}
              error={isVerificationError}
              required
            />
            {isVerificationError && (
              <Text style={styles.message}>올바르지 않은 인증번호입니다.</Text>
            )}
          </View>
          <View style={{ marginTop: 26.3 }}>
            <KkButton
              label="인증받기"
              type={verificationCode ? 'primary' : 'disabled'}
              size="large"
              onPress={() => {}}
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
          type={nickname && date && email && password && passwordConfirm ? 'primary' : 'disabled'}
          size="large"
          onPress={() => {}}
          shadow
        />
      </ScrollView>
    </View>
  );
}

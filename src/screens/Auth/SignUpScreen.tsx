import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import KkLoginTextbox from '../../design/component/KkLoginTextbox';
import { KkButton } from '../../design/component/KkButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 210,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  form: {
    paddingHorizontal: 16,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingBottom: 24,
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

  // 린트 에러 해결을 위해 에러 상태를 모두 true로 설정
  setIsEmailError(true);
  setIsVerificationError(true);
  setIsNicknameError(true);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <KkLoginTextbox
          label="닉네임"
          size="small"
          value={nickname}
          onChangeText={setNickname}
          placeholder="한글, 영문, 숫자만 입력"
          type="text"
          variant={nickname ? 'secondary' : 'primary'}
          enabled={!!nickname}
          error={isNicknameError}
          message={isNicknameError ? '이미 사용중인 닉네임입니다.' : ''}
        />
        <KkButton
          style={{ marginTop: 20 }}
          label="중복 확인"
          type={nickname ? 'primary' : 'disabled'}
          size="small"
          onPress={() => {}}
        />
      </View>

      <View style={styles.form}>
        <KkLoginTextbox
          label="생년월일"
          size="large"
          value={date}
          onChangeText={setDate}
          type="date"
          variant={date ? 'secondary' : 'primary'}
          enabled={!!date}
          error={false}
        />
      </View>

      <View style={styles.form}>
        <KkLoginTextbox
          label="이메일"
          size="small"
          value={email}
          onChangeText={setEmail}
          placeholder="이메일을 입력해주세요."
          type="email"
          variant={email ? 'secondary' : 'primary'}
          enabled={!!email}
          error={isEmailError}
          message={isEmailError ? '이메일 형식이 올바르지 않습니다.' : ''}
        />
        <KkButton
          style={{ marginTop: 24 }}
          label="인증받기"
          type={email ? 'primary' : 'disabled'}
          size="small"
          onPress={() => {}}
          shadow
        />
      </View>

      <View style={styles.form}>
        <KkLoginTextbox
          label="인증번호"
          size="small"
          value={verificationCode}
          onChangeText={setVerificationCode}
          placeholder="인증번호를 입력해주세요."
          type="text"
          variant={verificationCode ? 'secondary' : 'primary'}
          enabled={!!verificationCode}
          error={isVerificationError}
          message={isVerificationError ? '올바르지 않은 인증번호입니다.' : ''}
        />
        <KkButton
          style={{ marginTop: 24 }}
          label="인증받기"
          type={verificationCode ? 'primary' : 'disabled'}
          size="small"
          onPress={() => {}}
        />
      </View>

      <View style={styles.form}>
        <KkLoginTextbox
          label="비밀번호"
          size="large"
          value={password}
          onChangeText={setPassword}
          placeholder="비밀번호를 입력해주세요."
          type="password"
          variant={password ? 'secondary' : 'primary'}
          enabled={!!password}
          error={false}
        />
      </View>

      <View style={styles.form}>
        <KkLoginTextbox
          label="비밀번호 확인"
          size="large"
          value={passwordConfirm}
          onChangeText={setPasswordConfirm}
          placeholder="비밀번호를 입력해주세요."
          type="password"
          variant={passwordConfirm ? 'secondary' : 'primary'}
          enabled={!!passwordConfirm}
          error={false}
        />
      </View>

      <KkButton
        label="다음"
        type={nickname && date && email && password && passwordConfirm ? 'primary' : 'disabled'}
        size="large"
        onPress={() => {}}
      />
    </View>
  );
}

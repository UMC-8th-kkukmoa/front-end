import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../design/component/Header';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import colors from '../../design/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
  },
  formContainer: {
    padding: 26,
    gap: 32,
  },
  passwordField: {
    width: '100%',
  },
  submitButton: {
    marginHorizontal: 28,
    marginTop: 64,
  },
});

export default function PasswordResetScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
    } else {
      // TODO: 비밀번호 변경
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Header title="비밀번호 재설정" onBackPress={() => {}} />
      <View style={styles.formContainer}>
        <KkTextbox
          style={styles.passwordField}
          label="현재 비밀번호"
          type="password"
          size="large"
          variant="secondary"
          enabled
          error={!!error}
          message={error}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholder="현재 비밀번호를 입력해 주세요"
          required
        />
        <KkTextbox
          style={styles.passwordField}
          label="변경할 비밀번호"
          type="password"
          size="large"
          variant="secondary"
          enabled
          error={false}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="변경할 비밀번호를 입력해주세요"
          required
        />
        <KkTextbox
          style={styles.passwordField}
          label="변경할 비밀번호"
          type="password"
          size="large"
          variant="secondary"
          enabled
          error={newPassword !== confirmPassword && confirmPassword.length > 0}
          message={
            newPassword !== confirmPassword && confirmPassword.length > 0
              ? '비밀번호가 일치하지 않습니다.'
              : ''
          }
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="변경할 비밀번호를 입력해주세요"
          required
        />
      </View>

      <KkButton
        style={styles.submitButton}
        label="저장하기"
        type={
          !error && currentPassword && newPassword && newPassword === confirmPassword
            ? 'primary'
            : 'disabled'
        }
        size="large"
        onPress={handlePasswordChange}
      />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import colors from '../../design/colors';
import styles from './OwnerJoinShopScreen.style';
import { registerOwner } from '../../api/owner';

function Checkbox({ checked, onPress }: { checked: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.checkbox}>
      <Icon
        name={checked ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={30}
        color={checked ? colors.light.main : colors.light.gray2}
      />
    </TouchableOpacity>
  );
}

export default function OwnerJoinShopScreen() {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [userIdError, setUserIdError] = useState<string | undefined>();
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | undefined>();

  useEffect(() => {
    if (passwordConfirm && password !== passwordConfirm) {
      setPasswordConfirmError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmError(undefined);
    }
  }, [password, passwordConfirm]);

  const registerMutation = useMutation({
    mutationFn: registerOwner,
    onSuccess: () => {
      // TODO: Handle success
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 409) {
        setUserIdError('이미 사용중인 아이디입니다.');
      } else {
        console.error('Failed to register owner', error);
      }
    },
  });

  const allAgreed = agreeTerms && agreePrivacy;

  const handleAllAgree = () => {
    const newValue = !allAgreed;
    setAgreeTerms(newValue);
    setAgreePrivacy(newValue);
  };

  const isNextDisabled =
    !userId || !password || !passwordConfirm || !allAgreed || password !== passwordConfirm;

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="입점 신청하기" onBackPress={router.back} shadow={false} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>계정 등록</Text>
            <View style={styles.formContainer}>
              <KkTextbox
                label="연락처(ID)"
                placeholder="숫자만 입력해주세요."
                value={userId}
                onChangeText={(text) => {
                  setUserId(text);
                  if (userIdError) {
                    setUserIdError(undefined);
                  }
                }}
                style={styles.textbox}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={!!userIdError}
                message={userIdError}
                required
              />

              <KkTextbox
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChangeText={setPassword}
                style={styles.textbox}
                size="large"
                variant="secondary"
                type="password"
                enabled
                error={false}
                required
              />

              <KkTextbox
                label="비밀번호 확인"
                placeholder="비밀번호를 입력해주세요."
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                style={styles.textbox}
                size="large"
                variant="secondary"
                type="password"
                enabled
                error={!!passwordConfirmError}
                message={passwordConfirmError}
                required
              />

              <View style={styles.agreementContainer}>
                <View style={styles.agreementRow}>
                  <Checkbox checked={agreeTerms} onPress={() => setAgreeTerms(!agreeTerms)} />
                  <Text style={styles.agreementText}>
                    <Text style={styles.requiredText}>(필수)</Text> 꾹모아 이용 약관 동의
                  </Text>
                </View>

                <View style={styles.agreementRow}>
                  <Checkbox checked={agreePrivacy} onPress={() => setAgreePrivacy(!agreePrivacy)} />
                  <Text style={styles.agreementText}>
                    <Text style={styles.requiredText}>(필수)</Text> 꾹모아 개인 정보 수집 및 이용
                    약관
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1 }} />
          <View style={styles.bottomContainer}>
            <View style={styles.allAgreementContainer}>
              <View style={styles.allAgreementRow}>
                <Checkbox checked={allAgreed} onPress={handleAllAgree} />
                <Text style={styles.allAgreementText}>모두 동의하기</Text>
              </View>
              <TouchableOpacity>
                <Icon name="add-outline" style={styles.plusIcon} />
              </TouchableOpacity>
            </View>

            <KkButton
              label="다음"
              onPress={() => {
                if (!isNextDisabled) {
                  registerMutation.mutate({
                    email: userId,
                    password,
                    agreeTerms,
                    agreePrivacy,
                  });
                }
              }}
              type={isNextDisabled ? 'disabled' : 'primary'}
              size="large"
              style={styles.button}
              shadow={false}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

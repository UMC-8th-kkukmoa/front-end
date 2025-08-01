import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../design/component/Header';
import KkTextbox from '../design/component/KkTextbox';
import { KkButton } from '../design/component/KkButton';
import colors from '../design/colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 26,
  },
  title: {
    fontSize: 18,
    color: colors.light.black,
    textAlign: 'center',
    paddingVertical: 21,
    fontWeight: 'bold',
  },
  textbox: {
    marginBottom: 16,
  },
  agreementContainer: {
    marginHorizontal: 8,
    gap: 12,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  agreementText: {
    marginLeft: 8,
    fontSize: 15,
    color: colors.light.black,
    fontFamily: 'Pretendard-Regular',
  },
  requiredText: {
    color: colors.light.main,
    fontFamily: 'Pretendard-Bold',
  },
  bottomContainer: {
    backgroundColor: colors.light.white,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  allAgreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 12,
  },
  allAgreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  allAgreementText: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.light.black,
    fontFamily: 'Pretendard-Regular',
  },
  button: {
    marginTop: 20,
  },
  checkbox: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 24,
    color: colors.light.gray2,
  },
});

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
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

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
      <Header title="입점 신청하기" onBackPress={() => {}} shadow={false} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>계정 등록</Text>
            <View style={styles.formContainer}>
              <KkTextbox
                label="연락처(ID)"
                placeholder="숫자만 입력해주세요."
                value={userId}
                onChangeText={setUserId}
                style={styles.textbox}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
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
                error={false}
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
              onPress={() => {}}
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

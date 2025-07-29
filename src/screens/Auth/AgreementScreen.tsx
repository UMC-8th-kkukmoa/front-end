import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import { KkButton } from '../../design/component/KkButton';

const styles = StyleSheet.create({
  contain: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: colors.light.white,
  },
  container: {
    flex: 1,
    backgroundColor: colors.light.white,
    padding: 35,
    paddingTop: 40,
  },
  progressBarContainer: {
    marginTop: 15,
    alignItems: 'flex-start',
  },
  progressBarBackground: {
    width: '100%',
    height: 15.8,
    borderRadius: 15,
    backgroundColor: colors.light.gray1,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    width: '50%',
    height: '100%',
    backgroundColor: colors.light.main,
    borderRadius: 15,
  },
  progressText: {
    fontSize: 12.64,
    fontWeight: '600',
    color: colors.light.main,
    paddingLeft: 55,
  },
  agreementList: {
    marginTop: 32,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
  },
  checkboxText2: {
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 15,
    flex: 1,
    color: colors.light.gray2,
  },
  required: {
    color: colors.light.main,
    fontWeight: '600',
  },
  optional: {
    color: colors.light.black,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: colors.light.gray1,
    marginBottom: 10,
  },
  nextButton: {
    width: '100%',
    marginTop: 50,
  },
});

export default function AgreementScreen() {
  const router = useRouter();
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  const handleBack = () => {
    router.back();
  };

  const isAllRequiredChecked = agreements.terms && agreements.privacy;

  const toggleAgreement = (key: keyof typeof agreements) => {
    const updated = { ...agreements, [key]: !agreements[key] };
    setAgreements(updated);
    const all = Object.values(updated).every(Boolean);
    setAllChecked(all);
  };

  const toggleAll = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);
    setAgreements({
      terms: newValue,
      privacy: newValue,
      thirdParty: newValue,
      marketing: newValue,
    });
  };

  return (
    <View style={styles.contain}>
      <Header title="회원가입" onBackPress={handleBack} shadow={false} />
      <View style={styles.container}>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressText}>약관동의</Text>
        </View>

        <View style={styles.agreementList}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleAll}>
            <Icon
              name={allChecked ? 'checkmark-circle' : 'checkmark-circle-outline'}
              size={35}
              color={allChecked ? colors.light.main : colors.light.gray2}
              style={{ marginTop: 5 }}
            />
            <Text style={styles.checkboxText}>전체 약관에 동의합니다.</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {[
            { key: 'terms', type: 'required', label: '이용 약관 동의' },
            { key: 'privacy', type: 'required', label: '개인정보 수집 및 이용 약관 동의' },
            { key: 'thirdParty', type: 'optional', label: '제 3자 정보 제공 동의' },
            { key: 'marketing', type: 'optional', label: '마케팅 활용 동의' },
          ].map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.checkboxContainer}
              onPress={() => toggleAgreement(item.key as keyof typeof agreements)}
            >
              <Icon
                name={
                  agreements[item.key as keyof typeof agreements]
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                size={35}
                color={
                  agreements[item.key as keyof typeof agreements]
                    ? colors.light.main
                    : colors.light.gray2
                }
                style={{ marginTop: 5 }}
              />
              <Text style={styles.checkboxText2}>
                <Text style={item.type === 'required' ? styles.required : styles.optional}>
                  ({item.type === 'required' ? '필수' : '선택'})
                </Text>
                {item.label}
              </Text>
              <Icon name="add" size={21} color={colors.light.gray1} />
            </TouchableOpacity>
          ))}
          <KkButton
            style={styles.nextButton}
            label="다음"
            type={isAllRequiredChecked ? 'primary' : 'disabled'}
            size="large"
            onPress={() => {}}
            shadow
          />
        </View>
      </View>
    </View>
  );
}

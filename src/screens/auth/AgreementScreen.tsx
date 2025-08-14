import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import styles from './AgreementScreen.style';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import { KkButton } from '../../design/component/KkButton';

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
    <SafeAreaView style={styles.safeArea}>
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
            onPress={() => router.push('/auth/SignUpScreen')}
            shadow
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

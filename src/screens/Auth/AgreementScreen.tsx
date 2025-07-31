import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './AgreementScreen.style';
import colors from '../../design/colors';
import Header from '../../design/component/Header';
import { KkButton } from '../../design/component/KkButton';

export default function AgreementScreen() {
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    thirdParty: false,
    marketing: false,
  });

  const handleBack = () => {
    /* eslint-disable no-console */
    console.log('뒤로가기 눌림');
    /* eslint-enable no-console */
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
            { key: 'terms', label: '(필수) 이용 약관 동의' },
            { key: 'privacy', label: '(필수) 개인정보 수집 및 이용 약관 동의' },
            { key: 'thirdParty', label: '(선택) 제 3자 정보 제공 동의' },
            { key: 'marketing', label: '(선택) 마케팅 활용 동의' },
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
                <Text style={item.label.includes('(필수)') ? styles.required : styles.optional}>
                  {item.label.split(')')[0]})
                </Text>
                {item.label.split(')')[1]}
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

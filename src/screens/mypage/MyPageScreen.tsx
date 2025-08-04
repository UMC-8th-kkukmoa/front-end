import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../design/component/Header';
import colors from '../../design/colors';
import ChevronRightIcon from '../../assets/images/chevron-right.svg';

const styles = StyleSheet.create({
  container: {
    marginVertical: 14,
    marginHorizontal: 15,
  },
  header: {
    fontWeight: '600',
    fontSize: 13,
    color: colors.light.gray1,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  label: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 15,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: colors.light.gray1_35,
  },
  section: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: colors.light.gray1_35,
  },
});

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.header}>{title}</Text>;
}

function SectionLabel({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.label}>
        <Text style={styles.labelText}>{label}</Text>

        <ChevronRightIcon color={colors.light.gray2} width={24} height={24} />
      </View>
    </TouchableOpacity>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <SectionHeader title={title} />
      {children}
    </View>
  );
}

export default function MyPageScreen() {
  const router = useRouter();

  return (
    <View>
      <Header title="마이페이지" onBackPress={() => {}} />

      <View style={styles.container}>
        <Section title="이용 내역">
          <SectionLabel label="내 스탬프" onClick={() => {}} />
          <SectionLabel label="내 쿠폰" onClick={() => {}} />
          <SectionLabel
            label="내 금액권"
            onClick={() => router.push('/myGiftCard/MyGiftCardScreen')}
          />
        </Section>

        <Section title="계정 관리">
          <SectionLabel label="비밀번호 재설정" onClick={() => {}} />
          <SectionLabel label="사장님 로그인 (회원가입)" onClick={() => {}} />
          <SectionLabel label="로그아웃" onClick={() => {}} />
        </Section>
      </View>
    </View>
  );
}

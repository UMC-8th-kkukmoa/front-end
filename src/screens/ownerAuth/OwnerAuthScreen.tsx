import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { KkButton } from '../../design/component/KkButton';
import KkTextbox from '../../design/component/KkTextbox';
import styles from './OwnerAuthScreen.style';

const logoImage = require('../../assets/images/logo/LogoText2.png');

export default function OwnerAuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <KkTextbox
          label=""
          placeholder="이메일 주소"
          type="email"
          size="large"
          variant="secondary"
          value={email}
          onChangeText={setEmail}
          enabled
          error={false}
          style={styles.input}
        />
        <KkTextbox
          label=""
          placeholder="비밀번호"
          type="password"
          size="large"
          variant="secondary"
          value={password}
          onChangeText={setPassword}
          enabled
          error={false}
          style={styles.input}
        />
      </View>

      <View style={styles.buttonContainer}>
        <KkButton
          label="로그인"
          type="disabled"
          size="large"
          onPress={() => {
            // TODO: 로그인
          }}
          style={styles.loginButton}
          shadow
        />

        <View style={styles.joinButtonContainer}>
          <KkButton
            label="입점 신청하기"
            type="secondary"
            size="large"
            onPress={() => {
              // TODO: 입점 신청하기
            }}
            shadow
          />

          <KkButton
            label="입점 신청현황 조회"
            type="secondary"
            size="large"
            onPress={() => {
              // TODO: 입점 신청현황 조회
            }}
            shadow
          />
        </View>
      </View>
    </View>
  );
}

import React, { useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../../design/component/Header';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import styles from './OwnerJoinShopFormScreen.style';

export default function OwnerJoinShopFormScreen() {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [locationSet, setLocationSet] = useState(false);
  const [businessHours, setBusinessHours] = useState('');
  const [contact, setContact] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const { uri } = asset;
      setSelectedImageUri(uri);
    }
  };

  const isNextDisabled = useMemo(() => {
    return !storeName || !address || !businessHours || !locationSet || !selectedImageUri;
  }, [storeName, address, businessHours, locationSet, selectedImageUri]);

  const getDisplayNameFromUri = (uri: string) => {
    try {
      const withoutQuery = uri.split('?')[0];
      const last = withoutQuery.split('/').pop();
      return last ? decodeURIComponent(last) : 'image';
    } catch {
      return 'image';
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="입점 신청하기" onBackPress={() => {}} shadow={false} />
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>매장 등록</Text>

            <View style={styles.formContainer}>
              <KkTextbox
                label="매장명"
                placeholder="매장명을 입력해주세요."
                value={storeName}
                onChangeText={setStoreName}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
                required
              />

              <View style={styles.storeAddressFormContainer}>
                <KkTextbox
                  label="매장주소"
                  placeholder="주소를 입력해주세요."
                  value={address}
                  onChangeText={setAddress}
                  size="large"
                  variant="secondary"
                  type="text"
                  enabled
                  error={false}
                  required
                />
                <KkTextbox
                  label=""
                  placeholder="상세주소를 입력해주세요."
                  value={addressDetail}
                  onChangeText={setAddressDetail}
                  size="large"
                  variant="secondary"
                  type="text"
                  enabled
                  error={false}
                />
              </View>

              <View>
                <Text style={styles.label}>
                  매장 위치 설정<Text style={styles.required}> *</Text>
                </Text>
                <KkButton
                  label={locationSet ? '설정 완료' : '지도에서 설정하기'}
                  type={locationSet ? 'secondary' : 'secondary'}
                  size="large"
                  onPress={() => setLocationSet(true)}
                  shadow
                  style={styles.mapButton}
                />
              </View>

              <KkTextbox
                label="영업시간"
                placeholder="예: 09:00 - 18:00"
                value={businessHours}
                onChangeText={setBusinessHours}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
                required
              />

              <KkTextbox
                label="매장 연락처 (선택)"
                placeholder="숫자만 입력해주세요."
                value={contact}
                onChangeText={setContact}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
              />

              <View>
                <Text style={styles.label}>
                  매장 대표사진<Text style={styles.required}> *</Text>
                </Text>
                <TouchableOpacity onPress={handlePickImage} style={styles.fileRow}>
                  <Text style={styles.fileSelectText}>파일 선택</Text>

                  <Text style={styles.fileName}>
                    {selectedImageUri
                      ? getDisplayNameFromUri(selectedImageUri)
                      : '선택한 파일 없음'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <KkButton
            label="다음"
            type={isNextDisabled ? 'disabled' : 'primary'}
            size="large"
            onPress={() => {}}
            shadow
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

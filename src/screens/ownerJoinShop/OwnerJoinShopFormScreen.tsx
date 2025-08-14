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
import { useMutation } from '@tanstack/react-query';
import Header from '../../design/component/Header';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import styles from './OwnerJoinShopFormScreen.style';
import { uploadImage } from '../../api/images';
import { applyForStore } from '../../api/owner';

export default function OwnerJoinShopFormScreen() {
  const [storeName, setStoreName] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [openingHours, setOpeningHours] = useState('');
  const [closingHours, setClosingHours] = useState('');
  const [contact, setContact] = useState('');
  const [category, setCategory] = useState('');
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState(false);

  const formatAndCoerceTime = (text: string): string => {
    const digitsOnly = text.replace(/\D/g, '');
    const upTo6Digits = digitsOnly.slice(0, 6);

    let hoursStr = upTo6Digits.slice(0, 2);
    let minutesStr = upTo6Digits.slice(2, 4);
    let secondsStr = upTo6Digits.slice(4, 6);

    if (hoursStr.length === 2) {
      const hours = parseInt(hoursStr, 10);
      if (hours > 23) {
        hoursStr = '23';
      }
    }

    if (minutesStr.length === 2) {
      const minutes = parseInt(minutesStr, 10);
      if (minutes > 59) {
        minutesStr = '59';
      }
    }

    if (secondsStr.length === 2) {
      const seconds = parseInt(secondsStr, 10);
      if (seconds > 59) {
        secondsStr = '59';
      }
    }

    const coercedDigits = hoursStr + minutesStr + secondsStr;

    if (coercedDigits.length > 4) {
      return `${coercedDigits.slice(0, 2)}:${coercedDigits.slice(
        2,
        4,
      )}:${coercedDigits.slice(4, 6)}`;
    }
    if (coercedDigits.length > 2) {
      return `${coercedDigits.slice(0, 2)}:${coercedDigits.slice(2, 4)}`;
    }
    return coercedDigits;
  };

  const applyMutation = useMutation({
    mutationFn: applyForStore,
    onSuccess: () => {
      // TODO: Handle success (e.g., navigate to next screen)
    },
    onError: (error) => {
      // TODO: Handle error
      console.error('Failed to apply for store', error);
    },
  });

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const { uri } = asset;
    setSelectedImageUri(uri);
    setUploadedImageUrl(null);
    setUploadError(false);
    try {
      setIsUploading(true);
      const url = await uploadImage('store', uri);
      setUploadedImageUrl(url);
    } catch (e) {
      console.error('이미지 업로드 실패:', e);
      setUploadError(true);
    } finally {
      setIsUploading(false);
    }
  };

  const isNextDisabled = useMemo(() => {
    return (
      !storeName ||
      !address ||
      !openingHours ||
      !closingHours ||
      !latitude ||
      !longitude ||
      !uploadedImageUrl ||
      !category ||
      uploadError
    );
  }, [
    storeName,
    address,
    openingHours,
    closingHours,
    latitude,
    longitude,
    uploadedImageUrl,
    category,
    uploadError,
  ]);

  const getDisplayNameFromUri = (uri: string) => {
    try {
      const withoutQuery = uri.split('?')[0];
      const last = withoutQuery.split('/').pop();
      return last ? decodeURIComponent(last) : 'image';
    } catch {
      return 'image';
    }
  };

  const fileStatusText = useMemo(() => {
    if (uploadError) return '이미지 업로드에 실패했습니다. 다시 시도해주세요.';
    if (isUploading) return '업로드 중...';
    if (uploadedImageUrl) return '업로드 완료';
    if (selectedImageUri) return getDisplayNameFromUri(selectedImageUri);
    return '선택한 파일 없음';
  }, [uploadError, isUploading, uploadedImageUrl, selectedImageUri]);

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
                  label={latitude && longitude ? '설정 완료' : '지도에서 설정하기'}
                  type={latitude && longitude ? 'secondary' : 'secondary'}
                  size="large"
                  onPress={() => {
                    // TODO: Navigate to map screen to select location
                    setLatitude(37.4979);
                    setLongitude(127.0276);
                  }}
                  shadow
                  style={styles.mapButton}
                />
              </View>

              <KkTextbox
                label="영업시간"
                placeholder="여는 시간 (예: 09:00:00)"
                value={openingHours}
                onChangeText={(text) => setOpeningHours(formatAndCoerceTime(text))}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
                required
              />
              <KkTextbox
                label=""
                placeholder="닫는 시간 (예: 22:00:00)"
                value={closingHours}
                onChangeText={(text) => setClosingHours(formatAndCoerceTime(text))}
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

              <KkTextbox
                label="카테고리"
                placeholder="예: CAFE"
                value={category}
                onChangeText={setCategory}
                size="large"
                variant="secondary"
                type="text"
                enabled
                error={false}
                required
              />

              <View>
                <Text style={styles.label}>
                  매장 대표사진<Text style={styles.required}> *</Text>
                </Text>
                <TouchableOpacity
                  onPress={handlePickImage}
                  style={[styles.fileRow, uploadError && styles.fileRowError]}
                >
                  <Text style={styles.fileSelectText}>파일 선택</Text>

                  <Text style={uploadError ? styles.fileNameError : styles.fileName}>
                    {fileStatusText}
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
            onPress={() => {
              if (
                storeName &&
                address &&
                openingHours &&
                closingHours &&
                latitude &&
                longitude &&
                uploadedImageUrl &&
                category
              ) {
                applyMutation.mutate({
                  storeName,
                  storeAddress: address,
                  storeAddressDetail: addressDetail,
                  latitude,
                  longitude,
                  openingHours,
                  closingHours,
                  storePhoneNumber: contact,
                  storeImageUrl: uploadedImageUrl,
                  category,
                });
              }
            }}
            shadow
            style={styles.button}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../design/component/Header';
import KkTextbox from '../../design/component/KkTextbox';
import { KkButton } from '../../design/component/KkButton';
import styles from './OwnerJoinShopFormScreen.style';
import { uploadImage } from '../../api/images';
import { applyForStore, checkPendingRegistration } from '../../api/owner';
import useOwnerJoinStore from '../../store/useOwnerJoinStore';
import KkCompleteModal from '../../design/component/KkCompleteModal';
import useAuthStore from '../../store/useAuthStore';

export default function OwnerJoinShopFormScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    latitude: string;
    longitude: string;
    address: string;
  }>();

  const {
    storeName,
    address,
    addressDetail,
    latitude,
    longitude,
    openingHours,
    closingHours,
    contact,
    category,
    selectedImageUri,
    uploadedImageUrl,
    setStoreName,
    setAddress,
    setAddressDetail,
    setLatitude,
    setLongitude,
    setOpeningHours,
    setClosingHours,
    setContact,
    setCategory,
    setSelectedImageUri,
    setUploadedImageUrl,
    reset,
  } = useOwnerJoinStore();

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { loginType } = useAuthStore();
  const [isCheckingRegistration, setIsCheckingRegistration] = useState(false);
  const [isRegistrationPending, setIsRegistrationPending] = useState(false);

  useEffect(() => {
    const checkRegistration = async () => {
      if (loginType === 'kakao') {
        setIsCheckingRegistration(true);
        try {
          const isPending = await checkPendingRegistration();
          if (isPending) {
            setIsRegistrationPending(true);
          }
        } catch (error) {
          console.error('입점 신청 상태 확인 실패:', error);
        } finally {
          setIsCheckingRegistration(false);
        }
      }
    };

    checkRegistration();
  }, [loginType, router]);

  useEffect(() => {
    if (params.latitude && params.longitude) {
      setLatitude(parseFloat(params.latitude));
      setLongitude(parseFloat(params.longitude));
    }
    if (params.address) {
      setAddress(params.address);
    }
  }, [params, setLatitude, setLongitude, setAddress]);

  const formatAndCoerceTime = (text: string): string => {
    const digitsOnly = text.replace(/\D/g, '');
    const upTo4Digits = digitsOnly.slice(0, 4);

    let hoursStr = upTo4Digits.slice(0, 2);
    let minutesStr = upTo4Digits.slice(2, 4);

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

    const coercedDigits = hoursStr + minutesStr;

    if (coercedDigits.length > 2) {
      return `${coercedDigits.slice(0, 2)}:${coercedDigits.slice(2, 4)}`;
    }
    return coercedDigits;
  };

  const applyMutation = useMutation({
    mutationFn: applyForStore,
    onSuccess: () => {
      reset();
      setIsModalVisible(true);
    },
    onError: (error) => {
      Alert.alert('입점 신청 실패', error.message || '알 수 없는 이유로 실패했습니다.');
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

  if (isCheckingRegistration) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>입점 신청 상태를 확인 중입니다...</Text>
      </SafeAreaView>
    );
  }

  if (isRegistrationPending) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>이미 입점 신청을 했습니다.</Text>
        <KkButton
          label="돌아가기"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
          type="primary"
          size="large"
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="입점 신청하기" onBackPress={router.back} shadow={false} />
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

              <View style={styles.consecutiveFormContainer}>
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
                    router.push('/owner/PickLocation');
                  }}
                  shadow
                  style={styles.mapButton}
                />
              </View>

              <View style={styles.consecutiveFormContainer}>
                <KkTextbox
                  label="영업시간"
                  placeholder="여는 시간 (예: 09:00)"
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
                  placeholder="닫는 시간 (예: 22:00)"
                  value={closingHours}
                  onChangeText={(text) => setClosingHours(formatAndCoerceTime(text))}
                  size="large"
                  variant="secondary"
                  type="text"
                  enabled
                  error={false}
                  required
                />
              </View>

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

      <KkCompleteModal
        visible={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          router.replace('/(tabs)/profile');
        }}
        message="매장 등록이 완료되었습니다."
      />
    </SafeAreaView>
  );
}

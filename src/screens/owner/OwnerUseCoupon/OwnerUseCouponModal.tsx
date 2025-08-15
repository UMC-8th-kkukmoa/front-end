import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import colors from '../../../design/colors';
import CheckIcon from '../../../assets/images/checkmark_circle.svg';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    paddingVertical: 30,
    paddingHorizontal: 24,
    borderRadius: 16,
    backgroundColor: colors.light.white,
    alignItems: 'center',
    overflow: 'hidden',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    marginVertical: 17,
    color: colors.light.black,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 17,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.light.white,
    borderWidth: 1,
    borderColor: colors.light.main,
    marginRight: 8,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: colors.light.main,
    marginLeft: 8,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  cancelText: {
    color: colors.light.main,
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
  },
  confirmText: {
    color: colors.light.white,
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
  },
});

interface OwnerUseCouponModalProps {
  visible: boolean;
  message: string;
  qrUuid: string;
  onClose: () => void;
  navigationPath?: string;
}

export default function OwnerUseCouponModal({
  visible,
  message,
  qrUuid,
  onClose,
  navigationPath,
}: OwnerUseCouponModalProps) {
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: 'com.kkukmoa.accessToken',
      });

      if (!credentials) {
        Alert.alert('알림', '로그인이 필요합니다.');
        return;
      }

      const token = credentials.password;
      const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_URL || 'https://kkukmoa.shop';

      const response = await axios.patch(
        `${API_BASE_URL}/v1/owners/use/coupons/${qrUuid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.isSuccess) {
        Alert.alert('성공', '쿠폰이 사용되었습니다.');
        if (navigationPath) {
          router.push(navigationPath);
        }
        onClose();
      } else {
        Alert.alert('실패', response.data.message || '쿠폰 사용에 실패했습니다.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('오류', '쿠폰 사용 중 오류가 발생했습니다.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <CheckIcon width={150} height={144} />
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose} activeOpacity={0.8}>
              <Text style={styles.cancelText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

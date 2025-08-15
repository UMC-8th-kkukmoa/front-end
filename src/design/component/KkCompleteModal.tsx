import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../colors';
import CheckIcon from '../../assets/images/checkmark_circle.svg';

interface KkCompleteModalProps {
  visible: boolean;
  onClose?: () => void;
  navigationPath?: string;
  message?: string;
}

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
    backgroundColor: '#fff',
    alignItems: 'center',
    overflow: 'hidden',
  },
  message: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    marginVertical: 17,
    color: colors.light.black,
  },
  button: {
    backgroundColor: colors.light.main,
    marginTop: 17,
    paddingHorizontal: 60,
    paddingVertical: 17,
    borderRadius: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default function KkCompleteModal({
  visible,
  onClose,
  navigationPath,
  message,
}: KkCompleteModalProps) {
  const router = useRouter();

  const handleConfirm = () => {
    if (navigationPath) {
      router.push(navigationPath);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <CheckIcon width={150} height={144} />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={handleConfirm} activeOpacity={1}>
            <Text style={styles.buttonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

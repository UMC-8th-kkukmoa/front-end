import React from 'react';
import { Modal, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native';
import colors from '../../design/colors';

const barcodeImage = require('../../assets/images/barcodeExample.png');

interface BarcodeModalProps {
  visible: boolean;
  onClose: () => void;
  onUseCoupon: () => void;
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    height: 180,
    backgroundColor: colors.light.white,
    borderRadius: 12,
    alignItems: 'center',
    padding: 10,
  },
  barcodeImage: {
    width: 260,
    height: 160,
  },
});

export default function BarcodeModal({ visible, onClose, onUseCoupon }: BarcodeModalProps) {
  const handleUse = () => {
    onClose();
    onUseCoupon();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={styles.modalBackground} onPress={onClose}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity
            onPress={handleUse}
            accessibilityLabel="쿠폰 사용하기"
            activeOpacity={0.8}
          >
            <Image source={barcodeImage} style={styles.barcodeImage} resizeMode="contain" />
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

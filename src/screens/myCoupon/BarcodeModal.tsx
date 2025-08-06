import React from 'react';
import { Modal, StyleSheet, Pressable } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import colors from '../../design/colors';

interface BarcodeModalProps {
  visible: boolean;
  onClose: () => void;
  qrValue: string;
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 240,
    height: 240,
    backgroundColor: colors.light.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});

export default function BarcodeModal({ visible, onClose, qrValue }: BarcodeModalProps) {
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
          <QRCode value={qrValue} size={200} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

import React from 'react';
import { Modal, StyleSheet, Pressable, Image } from 'react-native';
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
          <Image
            source={{ uri: `data:image/png;base64,${qrValue}` }}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import colors from '../colors';

type KkAgreementModalProps = {
  visible: boolean;
  title: string;
  content: string;
  onClose: () => void;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.46)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 45,
    paddingVertical: 180,
  },
  modalContainer: {
    backgroundColor: colors.light.white,
    borderRadius: 20,
    width: '100%',
    maxHeight: '80%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    paddingTop: 20,
    paddingBottom: 12,
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center',
    color: colors.light.black,
  },
  scrollArea: {
    width: '100%',
    flexGrow: 0,
  },
  content: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
    lineHeight: 18,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: colors.light.sub,
    borderRadius: 25.85,
    paddingVertical: 4,
    paddingHorizontal: 18.5,
    shadowColor: colors.light.shadow,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Pretendard-SemiBold',
  },
});

function KkAgreementModal({ visible, title, content, onClose }: KkAgreementModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          <ScrollView style={styles.scrollArea}>
            <Text style={styles.content}>{content}</Text>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default KkAgreementModal;

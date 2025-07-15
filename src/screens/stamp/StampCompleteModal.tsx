import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import colors from '../../design/colors';

type StampCompleteModalProps = {
  visible: boolean;
  onClose: () => void;
};

const sparklersImg = require('../../assets/images/sparklers.png');

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: 300,
    height: 350,
    backgroundColor: colors.light.white,
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    elevation: 10,
  },
  image: {
    width: 145,
    height: 128,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 12,
  },
  message: {
    fontSize: 11,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.black,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 18,
  },
  orange: {
    color: colors.light.main,
    fontFamily: 'Pretendard-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 12,
  },
  buttonFirst: {
    backgroundColor: colors.light.white,
    width: 118,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonFirstText: {
    color: colors.light.main,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
  },
  buttonSecond: {
    backgroundColor: colors.light.main,
    width: 118,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  buttonSecondText: {
    color: colors.light.white,
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 15,
  },
});

export default function StampCompleteModal({
  visible,
  onClose,
}: StampCompleteModalProps): JSX.Element {
  return (
    <Modal transparent animationType="fade" visible={visible} statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Image source={sparklersImg} style={styles.image} />

          <Text style={styles.title}>스탬프 10개 채우기 완료</Text>
          <Text style={styles.message}>
            쿠폰을 받았습니다.{'\n'}받은 쿠폰은 <Text style={styles.orange}>내 쿠폰</Text>에서
            확인하실 수 있습니다.
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.buttonFirst} onPress={onClose}>
              <Text style={styles.buttonFirstText}>닫기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSecond} onPress={onClose}>
              <Text style={styles.buttonSecondText}>받은 쿠폰 보기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

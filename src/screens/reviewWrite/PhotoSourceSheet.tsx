import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Camera from '../../assets/images/cameraAdd.svg';
import ImageIcon from '../../assets/images/imageAdd.svg';
import XIcon from '../../assets/images/xIcon.svg';
import styles from './PhotoSourceSheet.style';

interface PhotoSourceSheetProps {
  visible: boolean;
  onClose: () => void;
  onPickCamera: () => void;
  onPickLibrary: () => void;
}

export default function PhotoSourceSheet({
  visible,
  onClose,
  onPickCamera,
  onPickLibrary,
}: PhotoSourceSheetProps) {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection="down"
      onSwipeComplete={onClose}
      style={{ justifyContent: 'flex-end', margin: 0 }}
      statusBarTranslucent
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating
      propagateSwipe
    >
      <View style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>사진 등록</Text>
          <TouchableOpacity onPress={onClose}>
            <XIcon />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.sheetItem} onPress={onPickCamera}>
          <Camera />
          <Text style={styles.sheetItemTxt}>카메라로 촬영하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sheetItem} onPress={onPickLibrary}>
          <ImageIcon />
          <Text style={styles.sheetItemTxt}>앨범에서 선택하기</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

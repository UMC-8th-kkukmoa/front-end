import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './MapFloatingButtons.style';
import HeartIcon from '../../../assets/images/heart.svg';
import PinIcon from '../../../assets/images/location.svg';
import TargetIcon from '../../../assets/images/target.svg';

interface Props {
  onPressTarget?: () => void;
}

function MapFloatingButtons({ onPressTarget }: Props) {
  return (
    <View style={styles.floatingButtonGroup}>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton}>
        <HeartIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton}>
        <TargetIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton} onPress={onPressTarget}>
        <PinIcon />
      </TouchableOpacity>
    </View>
  );
}

export default MapFloatingButtons;

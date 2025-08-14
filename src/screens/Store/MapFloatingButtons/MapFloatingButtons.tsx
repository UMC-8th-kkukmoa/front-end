import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './MapFloatingButtons.style';
import HeartIcon from '../../../assets/images/heart.svg';
import PinIcon from '../../../assets/images/location.svg';
import TargetIcon from '../../../assets/images/target.svg';

interface Props {
  onPressTarget?: () => void;
  onPressLocate?: () => void;
}

function MapFloatingButtons({ onPressTarget, onPressLocate }: Props) {
  return (
    <View style={styles.floatingButtonGroup}>
      <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton}>
        <HeartIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton} onPress={onPressTarget}>
        <TargetIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton} onPress={onPressLocate}>
        <PinIcon />
      </TouchableOpacity>
    </View>
  );
}

export default MapFloatingButtons;

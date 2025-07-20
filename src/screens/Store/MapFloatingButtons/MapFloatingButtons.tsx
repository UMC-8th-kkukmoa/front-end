import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './MapFloatingButtons.style';
import HeartIcon from '../../../assets/images/store/heart.svg';
import PinIcon from '../../../assets/images/store/location.svg';
import TargetIcon from '../../../assets/images/store/target.svg';

function MapFloatingButtons() {
  return (
    <View style={styles.floatingButtonGroup}>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton}>
        <HeartIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton}>
        <TargetIcon />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.9} style={styles.floatingButton}>
        <PinIcon />
      </TouchableOpacity>
    </View>
  );
}

export default MapFloatingButtons;

import React from 'react';
import { View, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './MapFloatingButtons.style';
import HeartIcon from '../../../assets/images/heart.svg';
import PinIcon from '../../../assets/images/location.svg';
import TargetIcon from '../../../assets/images/target.svg';

interface Props {
  onPressHeart?: () => void;
  onPressTarget?: () => void;
  onPressLocate?: () => void;
}

function MapFloatingButtons({ onPressHeart, onPressTarget, onPressLocate }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const containerPosition = isLandscape
    ? {
        right: 16,
        top: insets.top + 40, // 가로모드
        left: undefined,
        bottom: undefined,
      }
    : {
        left: 14,
        bottom: insets.bottom + 130, // 세로모드
        right: undefined,
        top: undefined,
      };

  return (
    <View pointerEvents="box-none" style={[styles.floatingButtonGroup, containerPosition]}>
      <TouchableOpacity activeOpacity={0.6} style={styles.floatingButton} onPress={onPressHeart}>
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

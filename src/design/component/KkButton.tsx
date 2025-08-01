import React, { JSX } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../colors';

export type KkButtonType = 'primary' | 'secondary' | 'disabled';
export type KkButtonSize = 'large' | 'small';

export interface KkButtonProps {
  style?: StyleProp<ViewStyle>;
  label: string;
  type: KkButtonType;
  size: KkButtonSize;
  onPress: () => void;
  left?: JSX.Element;
  shadow?: boolean;
}

const styles = StyleSheet.create({
  buttonStyles: {
    borderRadius: 30,
    shadowColor: '#6C313126',
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  shadowStyles: {
    shadowColor: '#6C3131',
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonTextStyles: {
    fontSize: 15,
    fontWeight: '600',
  },
  variantPrimary: {
    backgroundColor: colors.light.main,
  },
  variantPrimaryText: {
    color: colors.light.white,
  },
  variantSecondary: {
    backgroundColor: colors.light.white,
  },
  variantSecondaryText: {
    color: colors.light.main,
  },
  variantDisabled: {
    backgroundColor: colors.light.gray1,
  },
  variantDisabledText: {
    color: colors.light.gray2,
  },
  sizeLarge: {
    paddingVertical: 17,
  },
  sizeSmall: {
    paddingVertical: 13.5,
  },
});

const getVariantStyle = (type: KkButtonType) => {
  switch (type) {
    case 'primary':
      return styles.variantPrimary;
    case 'secondary':
      return styles.variantSecondary;
    case 'disabled':
      return styles.variantDisabled;
    default:
      return styles.variantPrimary;
  }
};

const getVariantTextStyle = (type: KkButtonType) => {
  switch (type) {
    case 'primary':
      return styles.variantPrimaryText;
    case 'secondary':
      return styles.variantSecondaryText;
    case 'disabled':
      return styles.variantDisabledText;
    default:
      return styles.variantPrimaryText;
  }
};

export function KkButton({ style, label, type, size, onPress, left, shadow }: KkButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyles,
        shadow && styles.shadowStyles,
        getVariantStyle(type),
        size === 'large' ? styles.sizeLarge : styles.sizeSmall,
        style,
      ]}
      accessibilityRole="button"
      accessible
      onPress={type === 'disabled' ? () => {} : onPress}
      disabled={type === 'disabled'}
    >
      <View>
        {left || null}
        <Text style={[styles.buttonTextStyles, getVariantTextStyle(type)]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

KkButton.defaultProps = {
  style: undefined,
  left: undefined,
  shadow: true,
};

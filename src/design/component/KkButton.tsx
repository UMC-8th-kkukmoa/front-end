import React, { JSX } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import colors from '../colors';

export type KkButtonType = 'primary' | 'secondary';
export type KkButtonSize = 'large' | 'small';

export interface KkButtonProps {
  style?: StyleProp<ViewStyle>;
  label: string;
  type: KkButtonType;
  size: KkButtonSize;
  onPress: () => void;
  left?: JSX.Element;
}

const styles = StyleSheet.create({
  buttonStyles: {
    borderRadius: 30,
    shadowColor: '#6C313126',
    display: 'flex',
    alignItems: 'center',
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
    color: colors.light.black,
  },
  sizeLarge: {
    paddingVertical: 17,
  },
  sizeSmall: {
    paddingVertical: 13.5,
  },
});

export function KkButton({ style, label, type, size, onPress, left }: KkButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.buttonStyles,
        type === 'primary' ? styles.variantPrimary : styles.variantSecondary,
        size === 'large' ? styles.sizeLarge : styles.sizeSmall,
        style,
      ]}
      accessibilityRole="button"
      accessible
      onPress={onPress}
    >
      <View>
        {left || null}

        <Text
          style={[
            styles.buttonTextStyles,
            type === 'primary' ? styles.variantPrimaryText : styles.variantSecondaryText,
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

KkButton.defaultProps = {
  style: undefined,
  left: undefined,
};

import React, { useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import colors from '../colors';

export type TextboxVariant = 'primary' | 'secondary';
type Size = 'large' | 'small';
type InputType = 'text' | 'email' | 'password' | 'date';

interface TextboxProps extends Omit<TextInputProps, 'secureTextEntry'> {
  style?: StyleProp<ViewStyle>;
  width: number;
  height: number;
  label: string;
  type: InputType;
  size: Size;
  variant: TextboxVariant;
  enabled: boolean;
  error: boolean;
  message?: string;
  required?: boolean;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: '500',
    color: colors.light.black,
  },
  inputWrapper: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    paddingVertical: 0,
    marginRight: 8,
  },
  message: {
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
  },
  errorIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.light.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

const sizeStyles = StyleSheet.create({
  large: {
    width: 333,
    height: 47,
    borderRadius: 30,
    paddingHorizontal: 21,
    paddingVertical: 4,
  },
  small: {
    width: 222,
    height: 48,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
});

export default function KkTextbox({
  label,
  variant = 'secondary',
  size = 'large',
  width,
  height,
  type = 'text',
  enabled = true,
  error = false,
  message,
  style,
  editable = true,
  required = false,
  value = '',
  onChangeText,
  placeholder = '',
}: TextboxProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [date, setDate] = useState(new Date());

  const isPassword = type === 'password';
  const isDate = type === 'date';
  const isInputEditable = editable && !isDate;

  const getColor = (colorType: 'border' | 'text' | 'placeholder' | 'icon') => {
    if (error) return colors.light.sub;
    if (!enabled) return colors.light.gray1;

    switch (colorType) {
      case 'border':
      case 'icon':
        return variant === 'primary' ? colors.light.main : colors.light.gray2;
      case 'text':
        return variant === 'primary' ? colors.light.black : colors.light.gray2;
      case 'placeholder':
        return colors.light.gray2;
      default:
        return colors.light.gray2;
    }
  };

  // 날짜 포맷팅
  const formatDate = (dateValue: Date) => dateValue.toISOString().split('T')[0];

  // 날짜 선택 처리
  const handleDatePress = () => {
    if (!enabled) return;

    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      display: 'default',
      onChange: (event, selectedDate) => {
        if (selectedDate) {
          setDate(selectedDate);
          onChangeText?.(formatDate(selectedDate));
        }
      },
    });
  };

  // 표시할 값 계산
  const displayValue = isDate ? value || formatDate(date) : value;

  // 아이콘 렌더링
  const renderIcon = () => {
    const iconColor = getColor('icon');

    if (isPassword) {
      return (
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          accessibilityLabel={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          disabled={!enabled}
        >
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={iconColor}
          />
        </TouchableOpacity>
      );
    }

    if (isDate) {
      return (
        <TouchableOpacity
          onPress={handleDatePress}
          accessibilityLabel="날짜 선택"
          disabled={!enabled}
        >
          <Icon name="calendar-outline" size={20} color={iconColor} />
        </TouchableOpacity>
      );
    }

    if (error) {
      return (
        <View style={styles.errorIcon}>
          <Text style={styles.errorText}>!</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={{ color: colors.light.main }}> *</Text>}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          sizeStyles[size],
          {
            borderColor: getColor('border'),
            ...(width && { width }),
            ...(height && { height }),
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: getColor('text') }]}
          editable={isInputEditable}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          value={displayValue}
          onChangeText={onChangeText}
          pointerEvents={isDate ? 'none' : 'auto'}
          placeholder={placeholder}
          placeholderTextColor={getColor('placeholder')}
        />

        {renderIcon()}
      </View>

      {message && (
        <Text style={[styles.message, { color: error ? colors.light.main : colors.light.gray2 }]}>
          {message}
        </Text>
      )}
    </View>
  );
}

KkTextbox.defaultProps = {
  style: undefined,
  message: undefined,
  required: undefined,
};

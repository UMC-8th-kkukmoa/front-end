/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
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
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../colors';

type Variant = 'enabled' | 'disabled' | 'error' | 'loginEnabled';
type Size = 'large' | 'small';
type InputType = 'text' | 'email' | 'password' | 'date';

interface TextboxProps extends Omit<TextInputProps, 'secureTextEntry'> {
  style?: StyleProp<ViewStyle>;
  label: string;
  type: InputType;
  size: Size;
  variant: Variant;
  message?: string;
  required?: boolean;
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: colors.light.black,
  },
  inputWrapper: {
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
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
    fontFamily: 'Pretendard',
    lineHeight: 16,
    letterSpacing: 0.4,
    marginTop: 6,
    marginLeft: 18,
  },
});

const sizeStyles = StyleSheet.create({
  large: {
    width: 333,
    height: 56,
    borderRadius: 30,
    paddingHorizontal: 21,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  small: {
    width: 222,
    height: 48,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const borderStyles = StyleSheet.create({
  enabled: {
    borderWidth: 1,
    borderColor: colors.light.gray2,
  },
  disabled: {
    borderWidth: 1,
    borderColor: colors.light.gray1,
  },
  error: {
    borderWidth: 1,
    borderColor: colors.light.sub,
  },
  loginEnabled: {
    borderWidth: 1,
    borderColor: colors.light.main,
  },
});

const textColorStyles = StyleSheet.create({
  enabled: {
    color: colors.light.gray2,
  },
  disabled: {
    color: colors.light.gray1,
  },
  error: {
    color: colors.light.sub,
  },
  loginEnabled: {
    color: colors.light.black,
  },
});

const placeholderColorStyles = StyleSheet.create({
  enabled: {
    color: colors.light.gray2,
  },
  disabled: {
    color: colors.light.gray1,
  },
  error: {
    color: colors.light.sub,
  },
  loginEnabled: {
    color: colors.light.gray2,
  },
});

export default function LoginTextbox({
  label,
  variant = 'enabled',
  size = 'large',
  type = 'text',
  message = '',
  style = {},
  editable = true,
  required = false,
  value = '',
  onChangeText = () => {},
  placeholder = '',
}: TextboxProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const isPassword = type === 'password';
  const isDate = type === 'date';
  const isError = variant === 'error';

  // 날짜 포맷팅 함수
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]; // yyyy-mm-dd
  };

  // 날짜 선택 처리
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onChangeText?.(formatDate(selectedDate));
    }
  };

  // 날짜 타입일 때 표시할 텍스트
  const getDisplayValue = () => {
    if (isDate) {
      return value || formatDate(date);
    }
    return value;
  };

  return (
    <View style={style}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={{ color: colors.light.main }}> *</Text>}
        </Text>
      )}

      <View style={[styles.inputWrapper, sizeStyles[size], borderStyles[variant]]}>
        <TextInput
          style={[styles.input, textColorStyles[variant]]}
          editable={editable && !isDate} // 날짜 타입일 때는 편집 불가
          secureTextEntry={isPassword && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          value={getDisplayValue()}
          onChangeText={onChangeText}
          pointerEvents={isDate ? 'none' : 'auto'} // 날짜 타입일 때 터치 이벤트 차단
          placeholder={placeholder}
          placeholderTextColor={placeholderColorStyles[variant].color}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            accessibilityLabel={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            accessibilityRole="button"
          >
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={variant === 'loginEnabled' ? colors.light.main : colors.light.gray2}
            />
          </TouchableOpacity>
        )}

        {isDate && (
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            accessibilityLabel="날짜 선택"
            accessibilityRole="button"
          >
            <Icon name="calendar-outline" size={20} color={colors.light.gray2} />
          </TouchableOpacity>
        )}

        {variant === 'error' && (
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: colors.light.main,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 12 }}>!</Text>
          </View>
        )}
      </View>

      {message && (
        <Text style={[styles.message, { color: isError ? colors.light.main : colors.light.gray2 }]}>
          {message}
        </Text>
      )}

      {showPicker && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
    </View>
  );
}

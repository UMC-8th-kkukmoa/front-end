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

export type TextboxVariant = 'primary' | 'secondary';
type Size = 'large' | 'small';
type InputType = 'text' | 'email' | 'password' | 'date';

interface TextboxProps extends Omit<TextInputProps, 'secureTextEntry'> {
  style?: StyleProp<ViewStyle>;
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
    height: 48,
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

const getBorderStyle = (variant: TextboxVariant, enabled: boolean, error: boolean) => {
  if (error) {
    return {
      borderWidth: 1,
      borderColor: colors.light.sub,
    };
  }

  if (!enabled) {
    return {
      borderWidth: 1,
      borderColor: colors.light.gray1,
    };
  }

  // enabled 상태에서 variant에 따른 스타일
  return {
    borderWidth: 1,
    borderColor: variant === 'primary' ? colors.light.main : colors.light.gray2,
  };
};

const getTextColor = (variant: TextboxVariant, enabled: boolean, error: boolean) => {
  if (error) {
    return colors.light.sub;
  }

  if (!enabled) {
    return colors.light.gray1;
  }

  // enabled 상태에서 variant에 따른 스타일
  return variant === 'primary' ? colors.light.black : colors.light.gray2;
};

const getPlaceholderColor = (variant: TextboxVariant, enabled: boolean, error: boolean) => {
  if (error) {
    return colors.light.sub;
  }

  if (!enabled) {
    return colors.light.gray1;
  }

  // enabled 상태에서는 variant에 관계없이 gray2
  return colors.light.gray2;
};

export default function KkLoginTextbox({
  label,
  variant = 'secondary',
  size = 'large',
  type = 'text',
  enabled = true,
  error = false,
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
  const isInputEditable = editable && !isDate;

  // 날짜 포맷팅 함수
  const formatDate = (formattedDate: Date) => {
    return formattedDate.toISOString().split('T')[0]; // yyyy-mm-dd
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

  const getIconColor = () => {
    if (error) {
      return colors.light.sub;
    }
    if (!enabled) {
      return colors.light.gray1;
    }
    return variant === 'primary' ? colors.light.main : colors.light.gray2;
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
        style={[styles.inputWrapper, sizeStyles[size], getBorderStyle(variant, enabled, error)]}
      >
        <TextInput
          style={[styles.input, { color: getTextColor(variant, enabled, error) }]}
          editable={isInputEditable}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          value={getDisplayValue()}
          onChangeText={onChangeText}
          pointerEvents={isDate ? 'none' : 'auto'}
          placeholder={placeholder}
          placeholderTextColor={getPlaceholderColor(variant, enabled, error)}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            accessibilityLabel={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            accessibilityRole="button"
            disabled={!enabled}
          >
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}

        {isDate && (
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            accessibilityLabel="날짜 선택"
            accessibilityRole="button"
            disabled={!enabled}
          >
            <Icon name="calendar-outline" size={20} color={getIconColor()} />
          </TouchableOpacity>
        )}

        {error && (
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
        <Text style={[styles.message, { color: error ? colors.light.main : colors.light.gray2 }]}>
          {message}
        </Text>
      )}

      {showPicker && enabled && (
        <DateTimePicker value={date} mode="date" display="default" onChange={handleDateChange} />
      )}
    </View>
  );
}

KkLoginTextbox.defaultProps = {
  style: undefined,
  message: undefined,
  required: undefined,
};

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../colors';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
    height: 35,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.light.gray1,
    paddingHorizontal: 10,
    backgroundColor: colors.light.white,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
  },
  arrow: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
    marginLeft: 5,
  },
  dropdownList: {
    marginTop: 6,
    backgroundColor: colors.light.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.gray1,
    elevation: 4,
    position: 'absolute',
    top: 33,
    width: 80,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.black,
  },
});

type Option = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  items: Option[];
  value: string | null;
  onSelect: (value: string) => void;
};

export default function CustomDropdown({ items, value, onSelect }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel = items.find((item) => item.value === value)?.label ?? '업종';

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={styles.text}>{selectedLabel}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdownList}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.value}
              style={styles.option}
              onPress={() => {
                onSelect(item.value);
                setOpen(false);
              }}
            >
              <Text style={styles.optionText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

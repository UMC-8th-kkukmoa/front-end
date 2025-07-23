import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import colors from '../colors';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 61,
    height: 27,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.light.gray1,
    paddingHorizontal: 10,
    backgroundColor: colors.light.white,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
  },
  arrow: {
    fontSize: 10,
    fontFamily: 'Pretendard-Regular',
    color: colors.light.gray2,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginBottom: 12,
  },
  bottomSheet: {
    backgroundColor: colors.light.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 24,
    maxHeight: height * 0.5,
  },
  title: {
    fontSize: 17,
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
    color: colors.light.black,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: colors.light.white,
    borderWidth: 1,
    borderColor: colors.light.sub,
    margin: 5,
    elevation: 3,
  },
  chipSelected: {
    backgroundColor: colors.light.sub,
  },
  chipText: {
    fontSize: 14,
    fontFamily: 'Pretendard-Medium',
    color: colors.light.sub,
  },
  chipTextSelected: {
    color: colors.light.white,
  },
  applyButton: {
    marginTop: 24,
    backgroundColor: colors.light.main,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: 'center',
    elevation: 4,
  },
  applyText: {
    color: colors.light.white,
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
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

  const [tempValue, setTempValue] = useState<string | null>(value);

  const selectedLabel = items.find((item) => item.value === value)?.label ?? '업종';

  const handleApply = () => {
    if (tempValue !== null) {
      onSelect(tempValue);
    }
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdown} onPress={() => setOpen(!open)} activeOpacity={0.8}>
        <Text style={styles.text}>{selectedLabel}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent visible={open} onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.bottomSheet} onPress={() => {}}>
            <View style={styles.handleBar} />
            <Text style={styles.title}>업종 선택</Text>
            <ScrollView contentContainerStyle={styles.chipContainer}>
              {items.map((item) => {
                const isSelected = tempValue === item.value;
                return (
                  <TouchableOpacity
                    key={item.value}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => setTempValue(item.value)}
                  >
                    <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>적용하기</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

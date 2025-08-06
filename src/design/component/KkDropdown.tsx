import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
} from 'react-native';
import colors from '../colors';
import CategoryTabs from '../../screens/Store/CategoryTabs/CategoryTabs';

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
    minWidth: 61,
    alignSelf: 'flex-start',
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
  applyButton: {
    marginTop: 16,
    backgroundColor: colors.light.main,
    paddingVertical: 14,
    marginBottom: 15,
    borderRadius: 30,
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
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
};

type KkDropdownProps = {
  items: Option[];
  value: string | null;
  onSelect: (value: string) => void;
};

export default function KkDropdown({ items, value, onSelect }: KkDropdownProps) {
  const [open, setOpen] = useState(false);
  const [tempValue, setTempValue] = useState<string | null>(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const selectedLabel = items.find((item) => item.value === value)?.label ?? '업종';

  const handleApply = () => {
    const appliedValue = tempValue ?? '';
    onSelect(appliedValue);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => {
          setTempValue(value);
          setOpen(true);
        }}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel={`업종 선택. 현재 선택: ${selectedLabel}`}
        accessibilityState={{ expanded: open }}
      >
        <Text style={styles.text}>{selectedLabel}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={open}
        onRequestClose={() => setOpen(false)}
        statusBarTranslucent
      >
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)}>
          <Pressable style={styles.bottomSheet} onPress={() => {}}>
            <View style={styles.handleBar} />
            <Text style={styles.title}>업종 선택</Text>
            <CategoryTabs
              selected={tempValue}
              onSelect={setTempValue}
              paddingHorizontal={5}
              paddingVertical={18}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyText}>적용하기</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

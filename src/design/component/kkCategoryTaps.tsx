import React from 'react';
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
// icon
import FoodIcon from '../../assets/images/food.svg';
import CafeIcon from '../../assets/images/cafe.svg';
import SalonIcon from '../../assets/images/salon.svg';
import EducationIcon from '../../assets/images/education.svg';
import ExerciseIcon from '../../assets/images/exercise.svg';
import colors from '../colors';

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 55,
    alignSelf: 'flex-start',
    paddingHorizontal: 9.9,
    paddingVertical: 3.3,
    height: 33,
  },
  tabSelected: {
    shadowColor: colors.light.shadow,
    shadowOpacity: 0.1,
    shadowOffset: { width: 1.02, height: 3.07 },
    shadowRadius: 3,
    elevation: 7,
    borderWidth: 1,
    borderColor: colors.light.main,
    backgroundColor: colors.light.white,
  },
  tabUnselected: {
    backgroundColor: colors.light.gray1_35,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  label: {
    marginBottom: 2.3,
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19.8,
  },
});

export const categoryData = [
  { name: '전체', value: null, icon: null },
  { name: '음식점', value: 'RESTAURANT', icon: FoodIcon },
  { name: '카페', value: 'CAFE', icon: CafeIcon },
  { name: '미용', value: 'BEAUTY', icon: SalonIcon },
  { name: '교육', value: 'EDUCATION', icon: EducationIcon },
  { name: '운동/건강', value: 'HEALTH', icon: ExerciseIcon },
];

type CategoryValue = (typeof categoryData)[number]['value'];

type Props = {
  selected: CategoryValue;
  onSelect: (value: CategoryValue) => void;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

function kkCategoryTaps({
  selected,
  onSelect,
  paddingHorizontal = 22,
  paddingVertical = 20,
}: Props) {
  const handleSelect = (value: CategoryValue) => {
    onSelect(selected === value ? null : value);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.scrollContainer,
        {
          paddingHorizontal,
          paddingVertical,
        },
      ]}
    >
      {categoryData.map((category) => {
        const isSelected = selected === category.value;
        const IconComponent = category.icon;
        const iconColor = isSelected ? colors.light.sub : colors.light.gray1_8;
        const textColor = isSelected ? colors.light.sub : colors.light.gray1_8;

        return (
          <TouchableOpacity
            key={String(category.value ?? 'ALL')}
            style={[
              styles.tab,
              isSelected ? styles.tabSelected : styles.tabUnselected, // ✅ 그림자 조건부 적용
            ]}
            onPress={() => handleSelect(category.value)}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrapper}>
              {IconComponent ? <IconComponent color={iconColor} /> : null}
              <Text style={[styles.label, { color: textColor }]}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default kkCategoryTaps;

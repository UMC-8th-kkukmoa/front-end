import React from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
import styles from './CategoryTabs.style';
// icon
import FoodIcon from '../../../assets/images/food.svg';
import CafeIcon from '../../../assets/images/cafe.svg';
import SalonIcon from '../../../assets/images/salon.svg';
import EducationIcon from '../../../assets/images/education.svg';
import ExerciseIcon from '../../../assets/images/exercise.svg';
import colors from '../../../design/colors';

export const categoryData = [
  { name: '음식점', value: 'RESTAURANT', icon: FoodIcon },
  { name: '카페', value: 'CAFE', icon: CafeIcon },
  { name: '미용', value: 'BEAUTY', icon: SalonIcon },
  { name: '교육', value: 'EDUCATION', icon: EducationIcon },
  { name: '운동/건강', value: 'HEALTH', icon: ExerciseIcon },
];

type Props = {
  selected: string | null;
  onSelect: (name: string | null) => void;
  paddingHorizontal?: number;
  paddingVertical?: number;
};

function CategoryTabs({ selected, onSelect, paddingHorizontal = 25, paddingVertical = 5 }: Props) {
  const handleSelect = (value: string) => {
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
        const iconColor = isSelected ? colors.light.white : colors.light.sub;
        const textColor = isSelected ? colors.light.white : colors.light.gray2;

        return (
          <TouchableOpacity
            key={category.value}
            style={[
              styles.tab,
              {
                backgroundColor: isSelected ? colors.light.sub : colors.light.white,
              },
            ]}
            onPress={() => handleSelect(category.value)}
            activeOpacity={0.8}
          >
            <View style={styles.iconWrapper}>
              <IconComponent color={iconColor} />
              <Text style={[styles.label, { color: textColor }]}>{category.name}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default CategoryTabs;

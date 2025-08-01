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

const categoryData = [
  { name: '음식점', icon: FoodIcon },
  { name: '카페', icon: CafeIcon },
  { name: '미용', icon: SalonIcon },
  { name: '교육', icon: EducationIcon },
  { name: '운동/건강', icon: ExerciseIcon },
];

type Props = {
  selected: string | null;
  onSelect: (name: string | null) => void;
};

function CategoryTabs({ selected, onSelect }: Props) {
  const handleSelect = (name: string) => {
    onSelect(selected === name ? null : name);
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categoryData.map((category) => {
        const isSelected = selected === category.name;
        const IconComponent = category.icon;
        const iconColor = isSelected ? colors.light.white : colors.light.sub;
        const textColor = isSelected ? colors.light.white : colors.light.gray2;

        return (
          <TouchableOpacity
            key={category.name}
            style={[
              styles.tab,
              {
                backgroundColor: isSelected ? colors.light.sub : colors.light.white,
              },
            ]}
            onPress={() => handleSelect(category.name)}
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

import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import styles from './CategoryTabs.style';
// icon
import FoodIcon from '../../../assets/images/store/food.svg';
import FoodIconActive from '../../../assets/images/store/food2.svg';
import CafeIcon from '../../../assets/images/store/cafe.svg';
import CafeIconActive from '../../../assets/images/store/cafe2.svg';
import SalonIcon from '../../../assets/images/store/salon.svg';
import SalonIconActive from '../../../assets/images/store/salon2.svg';
import EducationIcon from '../../../assets/images/store/education.svg';
import EducationIconActive from '../../../assets/images/store/education2.svg';
import ExerciseIcon from '../../../assets/images/store/exercise.svg';
import ExerciseIconActive from '../../../assets/images/store/exercise2.svg';

const categoryData = [
  {
    name: '음식점',
    icon: FoodIcon,
    selectedIcon: FoodIconActive,
  },
  {
    name: '카페',
    icon: CafeIcon,
    selectedIcon: CafeIconActive,
  },
  {
    name: '미용',
    icon: SalonIcon,
    selectedIcon: SalonIconActive,
  },
  {
    name: '교육',
    icon: EducationIcon,
    selectedIcon: EducationIconActive,
  },
  {
    name: '운동/건강',
    icon: ExerciseIcon,
    selectedIcon: ExerciseIconActive,
  },
];

function CategoryTabs() {
  const [selected, setSelected] = useState<string | null>('음식점');

  const handleSelect = (name: string) => {
    setSelected((prev) => (prev === name ? null : name));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categoryData.map((category) => {
        const isSelected = selected === category.name;
        const IconComponent = isSelected ? category.selectedIcon : category.icon;

        return (
          <TouchableOpacity
            key={category.name}
            style={styles.tab}
            onPress={() => handleSelect(category.name)}
            activeOpacity={0.8}
          >
            <IconComponent />
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default CategoryTabs;

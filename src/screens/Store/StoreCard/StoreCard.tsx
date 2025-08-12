import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { getReviewCount } from '../../../api/review';
import styles from './StoreCard.style';
import Arrow from '../../../assets/images/arrow.svg';
import Like from '../../../assets/images/like.svg';
import Unlike from '../../../assets/images/unlike.svg';
import FoodIcon from '../../../assets/images/food.svg';
import CafeIcon from '../../../assets/images/cafe.svg';
import SalonIcon from '../../../assets/images/salon.svg';
import EducationIcon from '../../../assets/images/education.svg';
import ExerciseIcon from '../../../assets/images/exercise.svg';
import colors from '../../../design/colors';

// 문자열 → SVG 컴포넌트 매핑
const categoryIconMap: Record<string, React.FC<any>> = {
  카페: CafeIcon,
  음식점: FoodIcon,
  '운동/건강': ExerciseIcon,
  교육: EducationIcon,
  미용실: SalonIcon,
};

type Props = {
  item: {
    storeId: string;
    name: string;
    imageUrl: string;
    categoryName: string;
    distance: string;
    time: string;
    bookmarkCount: number;
  };
  isLiked: boolean;
  onToggleLike: (storeId: string) => void;
};

function StoreCard({ item, isLiked, onToggleLike }: Props) {
  const router = useRouter();
  const IconComponent = categoryIconMap[item.categoryName];

  const { data: reviewCount, isLoading } = useQuery({
    queryKey: ['reviewCount', item.storeId],
    queryFn: () => getReviewCount(item.storeId),
    enabled: !!item.storeId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });

  return (
    <TouchableOpacity style={styles.card} onPress={() => router.push(`/store/${item.storeId}`)}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {IconComponent && (
        <View style={styles.categoryBadge}>
          <IconComponent width={12} height={12} color={colors.light.sub} />
          <Text style={styles.categoryLabel}>{item.categoryName}</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.subInfo}>
            {item.distance} | 영업시간 {item.time}
          </Text>

          <View style={styles.footer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>리뷰 {isLoading ? '0' : (reviewCount ?? 0)}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>찜 {item.bookmarkCount ?? 0}</Text>
            </View>
            <Arrow style={{ marginLeft: 6 }} />
          </View>
        </View>

        <TouchableOpacity
          style={styles.heart}
          onPress={(e) => {
            e.stopPropagation?.();
            onToggleLike(item.storeId);
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {isLiked ? <Like /> : <Unlike />}
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(StoreCard);

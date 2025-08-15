import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getReviewCount } from '../../../api/review';
import styles from './StoreCard.style';
import { getLikeCount } from '../../../api/like';
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
  };
  isLiked: boolean;
  onToggleLike: (storeId: string) => void;
  onPress?: (storeId: string) => void;
};

function StoreCard({ item, isLiked, onToggleLike, onPress }: Props) {
  const IconComponent = categoryIconMap[item.categoryName];

  const { data: reviewCount, isLoading } = useQuery({
    queryKey: ['reviewCount', item.storeId],
    queryFn: () => getReviewCount(item.storeId),
    enabled: !!item.storeId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
  });

  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', item.storeId],
    queryFn: () => getLikeCount(item.storeId),
    enabled: !!item.storeId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    placeholderData: 0, // 초기값 0으로 먼저 렌더
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => onPress?.(item.storeId)}
    >
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
              <Text style={styles.tagText}>찜 {likeCount ?? 0}</Text>
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

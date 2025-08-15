import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { getStoreDetail } from '../../../api/store';
import { getReviewCount, getReviewPreviews } from '../../../api/review';
import { getIsLiked } from '../../../api/shop';
import useLikeStore from '../../../hooks/useLikeStore';
import type { StoreDetail } from '../../../types/store';
import styles from './StoreDetailScreen.style';
import ReviewCard from '../ReviewCard/ReviewCard';
import BackArrow from '../../../assets/images/arrow_back.svg';
import Like from '../../../assets/images/like.svg';
import Unlike from '../../../assets/images/unlike.svg';
import colors from '../../../design/colors';

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailText}>{value}</Text>
    </View>
  );
}

const ItemSeparator = React.memo(() => <View style={{ width: 25 }} />);

function StoreDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [headerH, setHeaderH] = React.useState(0);
  const [HeaderS, setHeaderS] = React.useState(0);

  const { id, from: rawFrom } = useLocalSearchParams<{ id?: string; from?: string | string[] }>();
  const from = Array.isArray(rawFrom) ? rawFrom[0] : rawFrom;
  const storeId = id;
  const { toggleLike, isFavoriteShop, addFavoriteShop, removeFavoriteShop } = useLikeStore();

  const isLiked = storeId ? isFavoriteShop(storeId) : false;

  // 상세 데이터 패칭
  const {
    data: store,
    isPending,
    isError,
  } = useQuery<StoreDetail>({
    queryKey: ['storeDetail', storeId],
    queryFn: () => getStoreDetail(storeId as string),
    enabled: !!storeId,
    retry: 0,
    staleTime: 60_000,
  });

  const { data: isLikedData } = useQuery({
    queryKey: ['isLiked', storeId],
    queryFn: () => getIsLiked(storeId!),
    enabled: !!storeId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  useEffect(() => {
    if (isLikedData !== undefined && storeId) {
      if (isLikedData) {
        addFavoriteShop(storeId);
      } else {
        removeFavoriteShop(storeId);
      }
    }
  }, [isLikedData, storeId, addFavoriteShop, removeFavoriteShop]);

  // 리뷰 데이터 패칭
  const { data: previewCards } = useQuery({
    queryKey: ['reviewPreviews', storeId, 4],
    queryFn: () => getReviewPreviews(storeId!, 4),
    enabled: Boolean(storeId),
    staleTime: 30_000,
    select: (list: any[]) =>
      list.map((r) => ({
        id: String(r.reviewId),
        name: r.writerNickname ?? '익명',
        content: r.contentSnippet,
        image: r.thumbnailUrl ?? undefined,
      })),
  });

  // 리뷰 개수 데이터 패칭
  const { data: reviewCount, isLoading: isCountLoading } = useQuery({
    queryKey: ['storeReviewCount', storeId],
    queryFn: () => getReviewCount(storeId!),
    enabled: Boolean(storeId),
    staleTime: 60_000,
  });

  if (isPending) {
    return (
      <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={colors.light.main} />
        <Text style={{ marginTop: 8, color: colors.light.gray2 }}>가게 정보를 불러오는 중...</Text>
      </SafeAreaView>
    );
  }

  if (isError || !store) {
    return (
      <SafeAreaView style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Text style={{ color: colors.light.gray2 }}>가게 정보를 불러올 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const reviewCountToShow =
    typeof reviewCount === 'number' ? reviewCount : (store.reviewCount ?? 0);

  const handleBack = () => {
    if (from === 'stores') router.replace(`/(tabs)/${from}`);
    else router.back();
  };

  const details = [
    { label: '카테고리', value: store.categoryName },
    { label: '매장번호', value: store.merchantNumber || '-' },
    { label: '가게위치', value: `${store.address} ${store.detailAddress ?? ''}`.trim() },
    { label: '운영시간', value: `${store.openingHours} ~ ${store.closingHours}` },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <View style={[styles.header]} onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}>
        <TouchableOpacity style={[styles.backButton]} onPress={handleBack}>
          <BackArrow width={24} height={24} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={[styles.bottomShadow, { top: headerH + insets.top }]}
      />
      <View style={styles.storeImageArea} onLayout={(e) => setHeaderS(e.nativeEvent.layout.height)}>
        {store.storeImage ? (
          <Image source={{ uri: store.storeImage }} style={styles.storeImage} resizeMode="cover" />
        ) : (
          <Text style={{ color: colors.light.gray2 }}>이미지가 없습니다.</Text>
        )}
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={[styles.bottomShadow, { top: headerH + HeaderS + insets.top }]}
      />

      <View style={styles.storeInfo}>
        <View style={styles.titleSection}>
          <View style={styles.headerRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                if (storeId) toggleLike(storeId);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isLiked ? <Like /> : <Unlike />}
            </TouchableOpacity>
          </View>

          <Text style={styles.reviewCount}>
            (리뷰 {isCountLoading ? '...' : reviewCountToShow}개)
          </Text>
        </View>
        <View style={styles.detailSection}>
          {details.map((item) => (
            <DetailRow key={item.label} label={item.label} value={item.value} />
          ))}
        </View>
      </View>

      {/* 리뷰 */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>리뷰</Text>
          <TouchableOpacity
            style={styles.buttonWrapper}
            onPress={() => router.push(`/store/${store.storeId}/reviews`)}
          >
            <Text style={styles.seeAllButton}>전체보기</Text>
          </TouchableOpacity>
        </View>

        {!previewCards?.length ? (
          <View style={{ alignItems: 'center', paddingVertical: 50 }}>
            <Text style={{ color: colors.light.gray2 }}>아직 리뷰가 없어요.</Text>
          </View>
        ) : (
          <FlatList
            data={previewCards}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ReviewCard review={item} />}
            contentContainerStyle={{ paddingHorizontal: 30 }}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default StoreDetailScreen;

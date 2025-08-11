import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { getStoreDetail } from '../../../api/store';
import type { StoreDetail } from '../../../types/store';
import styles from './StoreDetailScreen.style';
import ReviewCard from '../ReviewCard/ReviewCard';
import BackArrow from '../../../assets/images/arrow_back.svg';
import Like from '../../../assets/images/like.svg';
import Unlike from '../../../assets/images/unlike.svg';
import colors from '../../../design/colors';

// 리뷰 더미데이터
const mockReviews = [
  {
    id: '1',
    name: '미딩',
    content: '정말 맛있습니다! 또 올 것 같아요.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  },
  { id: '2', name: '미딩', content: '매장이 깔끔하고 친절했어요.' },
  {
    id: '3',
    name: '미딩',
    content: '음료도 맛있고 분위기도 굿!',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  },
];

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailText}>{value}</Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={{ width: 25 }} />;
}

function StoreDetailScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const storeId = Array.isArray(id) ? id[0] : id;

  const [isLiked, setIsLiked] = useState(false); // 찜 상태 API 연동 시 교체

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

  const details = [
    { label: '카테고리', value: store.categoryName },
    { label: '매장번호', value: store.merchantNumber || '-' },
    { label: '가게위치', value: `${store.address} ${store.detailAddress ?? ''}`.trim() },
    { label: '운영시간', value: `${store.openingHours} ~ ${store.closingHours}` },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.replace('/(tabs)/stores')}
      >
        <BackArrow width={24} height={24} color={colors.light.black} />
      </TouchableOpacity>

      <View style={styles.storeImageArea}>
        {store.storeImage ? (
          <Image source={{ uri: store.storeImage }} style={styles.storeImage} resizeMode="cover" />
        ) : (
          <Text style={{ color: colors.light.gray2 }}>이미지가 없습니다.</Text>
        )}
      </View>

      <View style={styles.storeInfo}>
        <View style={styles.titleSection}>
          <View style={styles.headerRow}>
            <Text style={styles.storeName}>{store.name}</Text>
            <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation?.();
                setIsLiked((prev) => !prev);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              {isLiked ? <Like /> : <Unlike />}
            </TouchableOpacity>
          </View>

          <Text style={styles.reviewCount}>(리뷰 {store.reviewCount}개)</Text>
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
          <TouchableOpacity style={styles.buttonWrapper}>
            <Text style={styles.seeAllButton}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockReviews}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard review={item} />}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </SafeAreaView>
  );
}

export default StoreDetailScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './StoreDetailScreen.style';
import ReviewCard from '../ReviewCard/ReviewCard';
import BackArrow from '../../../assets/images/arrow_back.svg';
import Like from '../../../assets/images/like.svg';
import Unlike from '../../../assets/images/unlike.svg';

// 가게 정보 더미데이터
const mockStores = [
  {
    id: '8',
    name: '스토리팩토리건대점',
    imageUrl: 'https://picsum.photos/200/140?1',
    category: '교육',
    time: '오전 10시 ~ 오후 9시',
    reviewCount: 27,
    isLiked: false,
  },
];

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

  const store = mockStores.find((s) => s.id === id);

  const [isLiked, setIsLiked] = useState(store?.isLiked || false);

  // 가게 정보 없을때 임시 화면
  if (!store) {
    return <Text>가게 정보를 불러올 수 없습니다.</Text>;
  }

  const details = [
    { label: '카테고리', value: store.category },
    { label: '매장번호', value: '3203430500' },
    { label: '가게위치', value: '경기도 용인시 기흥구 신갈로 149' },
    { label: '운영시간', value: store.time },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <TouchableOpacity
        style={[styles.backButton, { top: insets.top + 12 }]}
        onPress={() => router.replace('/(tabs)/stores')}
      >
        <BackArrow />
      </TouchableOpacity>

      <View style={styles.storeImageArea} />

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
          <TouchableOpacity style={styles.buttonWapper}>
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

import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './StoreDetailScreen.style';
import ReviewCard from '../ReviewCard/ReviewCard';

const mockReviews = [
  { id: '1', content: '정말 맛있습니다! 또 올 것 같아요.' },
  { id: '2', content: '매장이 깔끔하고 친절했어요.' },
  { id: '3', content: '음료도 맛있고 분위기도 굿!' },
];

function StoreDetailScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backArrow}>{'<'}</Text>
      </TouchableOpacity>

      {/* 가게 정보 */}
      <View style={styles.storeInfo}>
        <View style={styles.headerRow}>
          <Text style={styles.storeName}>꾹모아카페 성신여대입구점</Text>
          <TouchableOpacity>
            <Text style={styles.heartIcon}>🧡</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.reviewCount}>(리뷰 12개)</Text>
        <Text style={styles.detailText}>카테고리: 카페</Text>
        <Text style={styles.detailText}>매장번호: 3203430500</Text>
        <Text style={styles.detailText}>가게위치: 경기도 용인시 기흥구 신갈로 149</Text>
        <Text style={styles.detailText}>운영시간: 오전 10시 ~ 오후 9시</Text>
      </View>

      {/* 리뷰 */}
      <View style={styles.reviewSection}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>리뷰</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>전체보기</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={mockReviews}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReviewCard review={item} />}
        />
      </View>
    </View>
  );
}

export default StoreDetailScreen;

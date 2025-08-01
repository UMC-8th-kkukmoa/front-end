import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import styles from './MainScreen.style';
import StoreCard from '../Store/StoreCard/StoreCard';
import HeartIcon from '../../assets/images/Vector.svg';
import BellIcon from '../../assets/images/bell.svg';
import BannerImage from '../../assets/images/banner.svg';
import MapPinIcon from '../../assets/images/map-pin2.svg';
import QRIcon from '../../assets/images/maximize.svg';
import StampIcon from '../../assets/images/star.svg';
import SearchBarIcon from '../../assets/images/search-icon.svg';
import QRcodeIcon from '../../assets/images/Group.svg';

// 더미데이터 (10)
const mockStores = [
  {
    id: '1',
    name: '꾹모아모아카페 성신여대입구점',
    imageUrl: 'https://picsum.photos/200/140?1',
    category: '카페',
    distance: '2.16 km',
    time: '09:00 ~ 21:00',
    reviewCount: 21,
    bookmarkCount: 39,
  },
  {
    id: '2',
    name: '달콤한디저트카페 강남역점',
    imageUrl: 'https://picsum.photos/200/140?2',
    category: '카페',
    distance: '1.05 km',
    time: '10:00 ~ 22:00',
    reviewCount: 10,
    bookmarkCount: 15,
  },
  {
    id: '3',
    name: '혼커피 홍대점',
    imageUrl: 'https://picsum.photos/200/140?3',
    category: '카페',
    distance: '0.87 km',
    time: '08:00 ~ 20:00',
    reviewCount: 45,
    bookmarkCount: 67,
  },
  {
    id: '4',
    name: '브레드마루 신촌본점',
    imageUrl: 'https://picsum.photos/200/140?4',
    category: '운동/건강',
    distance: '3.42 km',
    time: '07:30 ~ 19:00',
    reviewCount: 34,
    bookmarkCount: 22,
  },
  {
    id: '5',
    name: '모모티하우스 이태원점',
    imageUrl: 'https://picsum.photos/200/140?5',
    category: '음식점',
    distance: '5.11 km',
    time: '11:00 ~ 23:00',
    reviewCount: 18,
    bookmarkCount: 12,
  },
  {
    id: '6',
    name: '헬시핏짐 강남점',
    imageUrl: 'https://picsum.photos/200/140?6',
    category: '운동/건강',
    distance: '2.45 km',
    time: '06:00 ~ 23:00',
    reviewCount: 50,
    bookmarkCount: 40,
  },
  {
    id: '7',
    name: '헤어클래식 명동점',
    imageUrl: 'https://picsum.photos/200/140?7',
    category: '미용',
    distance: '1.95 km',
    time: '10:00 ~ 20:00',
    reviewCount: 12,
    bookmarkCount: 9,
  },
  {
    id: '8',
    name: '스터디팩토리 건대점',
    imageUrl: 'https://picsum.photos/200/140?8',
    category: '교육',
    distance: '0.74 km',
    time: '08:00 ~ 22:00',
    reviewCount: 27,
    bookmarkCount: 18,
  },
  {
    id: '9',
    name: '에그버거 서초점',
    imageUrl: 'https://picsum.photos/200/140?9',
    category: '음식점',
    distance: '3.22 km',
    time: '11:00 ~ 21:30',
    reviewCount: 30,
    bookmarkCount: 21,
  },
  {
    id: '10',
    name: '루프탑카페 이화여대점',
    imageUrl: 'https://picsum.photos/200/140?10',
    category: '카페',
    distance: '1.11 km',
    time: '09:30 ~ 22:00',
    reviewCount: 16,
    bookmarkCount: 25,
  },
];

function MainScreen() {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const router = useRouter();

  const toggleLike = useCallback((id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  return (
    <View style={styles.container}>
      {/* 상단 주황색 헤더 */}
      <View style={styles.headerContainer}>
        <View style={styles.topBar}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MapPinIcon width={24} height={24} />
            <Text style={styles.location}>용인시 기흥구 신갈동</Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity>
              <QRcodeIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <HeartIcon width={24} height={24} />
            </TouchableOpacity>
            <TouchableOpacity>
              <BellIcon width={24} height={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 흰색 모달 */}
      <View style={styles.whiteModal}>
        <View style={styles.searchRow}>
          {/* 버튼 */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.iconButton}>
              <QRIcon width={26} height={26} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <StampIcon width={26} height={26} />
            </TouchableOpacity>
          </View>
          {/* 검색 */}
          <View style={styles.searchBarContainer}>
            <TouchableOpacity
              style={styles.searchTouchable}
              onPress={() => router.push('/store/search')}
              activeOpacity={0.8}
            >
              <Text style={styles.searchPlaceholder}>매장을 검색해보세요.</Text>
              <SearchBarIcon width={23} height={23} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.cardList}>
          {/* 배너 (추후 컴포넌트 만들기) */}
          <View style={styles.banner}>
            <BannerImage width="92%" height={130} />
          </View>

          {/* 가게 카드 리스트 */}
          <View style={styles.cardContainer}>
            {mockStores.map((item) => (
              <StoreCard
                key={item.id}
                item={item}
                isLiked={likedMap[item.id] === true}
                onToggleLike={toggleLike}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default MainScreen;

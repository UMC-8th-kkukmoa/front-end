import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import styles from './StoreBottomSheet.style';
import MapPin from '../../../assets/images/store/mappin.svg';
import MapButton from '../../../assets/images/store/mapbutton.svg';
import StoreCard from '../StoreCard/StoreCard';

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

function BottomSheetHandle() {
  return (
    <View style={styles.bottomSheetHandleIndicatorWrapper}>
      <View style={styles.bottomSheetHandleIndicator} />
    </View>
  );
}

type Props = {
  selectedCategory: string | null;
};

function StoreBottomSheet({ selectedCategory }: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '80%'], []);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sheetIndex, setSheetIndex] = useState(1);
  const [showMapButton, setShowMapButton] = useState(false); // 지도보기 버튼 반응 느려서 추가

  // 시트 관리
  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);

    // 바텀시트 상태에 따라 지도 버튼 관리
    if (index === 1) {
      setShowMapButton(true);
    } else {
      setShowMapButton(false);
    }

    // 80% 위로 열리지 않도록 고정
    if (index > 1) {
      sheetRef.current?.snapToIndex(1);
    }
  }, []);

  // 지도보기 버튼 클릭 -> 시트 컨트롤
  const handleMapButtonPress = () => {
    setShowMapButton(false);
    sheetRef.current?.snapToIndex(0);
  };

  // 하트 관리
  const toggleLike = (id: string) => {
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  // 카테고리 필터링 & 거리 순 정렬
  const filteredAndSortedStores = useMemo(() => {
    const filtered = !selectedCategory
      ? mockStores
      : mockStores.filter((store) => store.category === selectedCategory);

    const sorted = filtered
      .map((store) => ({
        ...store,
        distanceValue: parseFloat(store.distance.replace(' km', '')),
      }))
      .sort((a, b) => a.distanceValue - b.distanceValue);

    return sorted;
  }, [selectedCategory]);

  // 가게 리스트 카드
  const renderItem = ({ item }: { item: (typeof mockStores)[0] }) => (
    <StoreCard item={item} isLiked={likedMap[item.id] === true} onToggleLike={toggleLike} />
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleStyle={styles.bottomSheetHandle}
        enableContentPanningGesture={false}
        handleComponent={BottomSheetHandle}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <MapPin />
          <Text style={styles.locationText}>용인시 기흥구 신갈동</Text>
        </View>

        <BottomSheetFlatList
          data={filteredAndSortedStores}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ ...styles.listContentContainer, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
        />
      </BottomSheet>
      {showMapButton && (
        <TouchableOpacity style={styles.mapButton} onPress={handleMapButtonPress}>
          <MapButton />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default StoreBottomSheet;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Text,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import debounce from 'lodash.debounce';
import { getCurrentCoords } from '../../../utils/location';
import KkTextbox from '../../../design/component/KkTextbox';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BackIcon from '../../../assets/images/left-arrow.svg';
import styles from './SearchScreen.style';
import { searchStores } from '../../../api/store';
import StoreCard from '../../Store/StoreCard/StoreCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);
  const [location, setLocation] = useState({ latitude: 37.5117, longitude: 127.0868 });
  const controllerRef = useRef<AbortController | null>(null);

  const router = useRouter();
  const { from } = useLocalSearchParams();

  const size = 5;

  useEffect(() => {
    (async () => {
      try {
        const { lat, lng } = await getCurrentCoords();
        setLocation({ latitude: lat, longitude: lng });
      } catch (err) {
        console.warn('위치 가져오기 실패:', err);
        setLocation({ latitude: 37.5117, longitude: 127.0868 });
      }
    })();
  }, []);

  const handleBack = () => {
    if (from === 'stores') {
      router.replace('/(tabs)/stores');
    } else {
      router.back();
    }
  };

  const fetchStores = async (newQuery, pageNum = 0) => {
    if (!newQuery.trim()) {
      setStores([]);
      setTotalPages(1);
      setPage(0);
      return;
    }

    if (loading) return;

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    try {
      setLoading(true);
      setError(null);
      const data = await searchStores(
        newQuery,
        location.latitude,
        location.longitude,
        pageNum,
        size,
        controllerRef.current.signal,
      );
      if (pageNum === 0) {
        setStores(data.stores);
      } else {
        setStores((prev) => [...prev, ...data.stores]);
      }
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (e) {
      /* eslint-disable no-console */
      console.warn('검색 실패:', e);
      setError('검색 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchStores = useCallback(
    debounce((q) => {
      fetchStores(q, 0);
    }, 500),
    [location],
  );

  useEffect(() => {
    if (!isSearchCompleted) {
      debouncedFetchStores(query);
    }
    return () => {
      debouncedFetchStores.cancel();
    };
  }, [query, debouncedFetchStores, isSearchCompleted]);

  const onEndReached = () => {
    if (!loading && page + 1 < totalPages) {
      fetchStores(query, page + 1);
    }
  };

  const renderSearchListItem = ({ item }) => {
    const name = item.name || '';
    const lowerQuery = query.toLowerCase();
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = name.split(regex);

    const handlePress = () => {
      Keyboard.dismiss();
      const id = String(item.storeId);
      router.push({ pathname: '/store/[id]', params: { id, from: 'search' } });
    };

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.searchListItemContainer}
        onPress={handlePress}
      >
        <SearchIcon width={18} height={18} style={styles.searchIconMargin} />
        <Text style={styles.searchListItemText}>
          {parts.map((part, index) =>
            part.toLowerCase() === lowerQuery ? (
              // eslint-disable-next-line react/no-array-index-key
              <Text key={`${item.storeId}-${index}`} style={styles.highlightText}>
                {part}
              </Text>
            ) : (
              // eslint-disable-next-line react/no-array-index-key
              <Text key={`${item.storeId}-${index}`}>{part}</Text>
            ),
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = isSearchCompleted
    ? ({ item }) => (
        <StoreCard
          item={{
            storeId: String(item.storeId),
            name: item.name ?? '',
            imageUrl: item.storeImage ?? '',
            categoryName: item.categoryName ?? '',
            distance: `${item.distance ?? ''}km`,
            time:
              item.openingHours && item.closingHours
                ? `${item.openingHours} ~ ${item.closingHours}`
                : '',
            bookmarkCount: item.bookmarkCount ?? 0,
          }}
          isLiked={false}
          onToggleLike={() => {}} // TODO: 백엔드 좋아요 API 구현 후 연동
          onPress={(id) => router.push({ pathname: '/store/[id]', params: { id, from: 'search' } })}
        />
      )
    : renderSearchListItem;

  let content;
  if (loading && page === 0) {
    content = <ActivityIndicator size="large" color="#000" />;
  } else if (isSearchCompleted && stores.length === 0) {
    content = (
      <View style={styles.emptyResultContainer}>
        <Text style={styles.emptyResultText}>검색어와 일치하는 장소가 없습니다.</Text>
      </View>
    );
  } else {
    content = (
      <FlatList
        style={styles.flatList}
        data={isSearchCompleted ? stores : stores.slice(0, 5)}
        keyExtractor={(item) => String(item.storeId)}
        renderItem={renderItem}
        onEndReached={isSearchCompleted ? onEndReached : undefined}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleBack}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BackIcon />
        </TouchableOpacity>

        <View style={styles.searchWrapper}>
          <KkTextbox
            label=""
            placeholder="매장을 검색해보세요."
            type="text"
            size="small"
            variant="primary"
            enabled
            error={false}
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              setIsSearchCompleted(false);
            }}
            onSubmitEditing={() => {
              setIsSearchCompleted(true);
              fetchStores(query.trim(), 0);
              Keyboard.dismiss();
            }}
            style={styles.textBox}
          />

          <TouchableOpacity
            style={styles.iconWrapper}
            onPress={() => {
              setIsSearchCompleted(true);
              fetchStores(query, 0);
              Keyboard.dismiss();
            }}
          >
            <SearchIcon style={styles.iconButtonMargin} />
          </TouchableOpacity>
        </View>
      </View>

      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={styles.bottomShadow}
      />

      <View style={styles.body}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
        {content}
      </View>
    </SafeAreaView>
  );
}

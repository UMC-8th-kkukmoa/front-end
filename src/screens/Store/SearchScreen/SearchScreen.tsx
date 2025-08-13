import React, { useState, useEffect, useCallback } from 'react';
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
import { debounce } from 'lodash';
import KkTextbox from '../../../design/component/KkTextbox';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BackIcon from '../../../assets/images/left-arrow.svg';
import styles from './SearchScreen.style';
import { searchStores } from '../../../api/store';
import StoreCard from '../StoreCard/StoreCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearchCompleted, setIsSearchCompleted] = useState(false);

  const router = useRouter();
  const { from } = useLocalSearchParams();

  const latitude = 37.5117;
  const longitude = 127.0868;
  const size = 5;

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

    try {
      setLoading(true);
      const data = await searchStores(newQuery, latitude, longitude, pageNum, size);
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
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchStores = useCallback(
    debounce((q) => {
      fetchStores(q, 0);
    }, 500),
    [],
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

    return (
      <View style={styles.searchListItemContainer}>
        <SearchIcon width={18} height={18} style={styles.searchIconMargin} />
        <Text style={styles.searchListItemText}>
          {parts.map((part) =>
            part.toLowerCase() === lowerQuery ? (
              <Text key={`${item.storeId}-${part}`} style={styles.highlightText}>
                {part}
              </Text>
            ) : (
              <Text key={`${item.storeId}-${part}`}>{part}</Text>
            ),
          )}
        </Text>
      </View>
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
            reviewCount: item.reviewCount ?? 0,
            bookmarkCount: item.bookmarkCount ?? 0,
          }}
          isLiked={false}
          onToggleLike={() => {}}
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

      <View style={styles.body}>{content}</View>
    </SafeAreaView>
  );
}

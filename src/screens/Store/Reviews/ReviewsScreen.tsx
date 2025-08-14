import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { ListRenderItem } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './ReviewsScreen.style';
import colors from '../../../design/colors';
import BackArrow from '../../../assets/images/arrow_back.svg';
import OwnerReplyIcon from '../../../assets/images/OwnerReplyIcon.svg';
import ReviewerIcon from '../../../assets/images/reviewerIcon.svg';

// ---- API & Types ----
import { getStoreReviewsByCursor, getReviewCount } from '../../../api/review';
import type { ReviewCursorEnvelopeDto } from '../../../types/review';

// ---- UI sub components ----
const Separator = React.memo(() => <View style={{ width: 20 }} />);

const PhotoThumb = React.memo(({ url }: { url: string }) => {
  return <Image source={{ uri: url }} style={styles.photo} />;
});

const ReviewsHeader = React.memo(({ count, imageUrl }: { count: number; imageUrl?: string }) => (
  <>
    {imageUrl ? (
      <Image source={{ uri: imageUrl }} style={[styles.banner]} resizeMode="cover" />
    ) : (
      <View style={[styles.banner]} />
    )}

    <LinearGradient
      pointerEvents="none"
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.4 }}
      colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
      style={[styles.bottomShadow]}
    />

    <View style={styles.headerBlock}>
      <Text style={styles.countReview}>리뷰 {count}개</Text>
    </View>
  </>
));

const ReviewsFooterLoading = React.memo(() => (
  <View style={styles.footerLoading}>
    <ActivityIndicator />
  </View>
));

const ReviewsFooterSpace = React.memo(() => <View style={styles.footerSpace} />);

// ---- 화면용 타입 ----
type ReviewImage = { id: string; url: string };
type OwnerReply = { id: string; content: string };
type ReviewItem = {
  id: string;
  userName: string;
  content: string;
  images?: ReviewImage[];
  ownerReply?: OwnerReply | null;
};

// ---- 서버 → 화면 어댑터 ----
function toReviewItemList(envelope: ReviewCursorEnvelopeDto): ReviewItem[] {
  const list = envelope.page?.content ?? [];
  return list.map((it) => {
    const { reviewId } = it;
    const images: ReviewImage[] = (it.imageUrls ?? []).map((u, imgIdx) => ({
      id: `${reviewId}-${imgIdx}`,
      url: u,
    }));

    return {
      id: String(reviewId),
      userName: it.writerNickname ?? '익명',
      content: it.content ?? '',
      images,
      ownerReply: null, // 사장님 연동 시 채워넣기
    };
  });
}

const renderPhotoItem: ListRenderItem<ReviewImage> = ({ item }) => <PhotoThumb url={item.url} />;

// ---- 리스트 내 서브뷰 ----
function HorizontalPhotos({ images }: { images: ReviewImage[] }) {
  return (
    <FlatList
      data={images}
      keyExtractor={(img) => img.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.photoRow}
      ItemSeparatorComponent={Separator}
      renderItem={renderPhotoItem}
    />
  );
}

function OwnerReplyCard({ reply }: { reply: OwnerReply }) {
  return (
    <View style={styles.replyCard}>
      <View style={styles.replyAvatar}>
        <OwnerReplyIcon />
      </View>
      <View style={styles.replyContent}>
        <Text style={styles.replyOwnerName}>사장님</Text>
        <Text style={styles.replyText}>{reply.content}</Text>
      </View>
    </View>
  );
}
type ReviewItemViewProps = Omit<ReviewItem, 'id'>;
function ReviewItemView({ userName, content, images, ownerReply }: ReviewItemViewProps) {
  return (
    <View style={styles.reviewCard}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <ReviewerIcon />
        </View>
        <Text style={styles.name}>{userName}</Text>
      </View>

      <Text style={styles.content}>{content}</Text>

      {!!images?.length && <HorizontalPhotos images={images} />}

      {!!ownerReply && <OwnerReplyCard reply={ownerReply} />}
    </View>
  );
}

// ---- 메인 화면 ----
export default function ReviewsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [headerH, setHeaderH] = React.useState(0);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const enabled = Boolean(id);

  const { data, isLoading, isRefetching, isFetchingNextPage, fetchNextPage, hasNextPage, refetch } =
    useInfiniteQuery({
      queryKey: ['storeReviews', id],
      queryFn: ({ pageParam }) => getStoreReviewsByCursor(id!, pageParam /* cursor */, 10),
      initialPageParam: undefined as string | undefined, // 첫 페이지: cursor 없음
      getNextPageParam: (last: ReviewCursorEnvelopeDto) =>
        last.page.hasNext ? (last.page.nextCursor ?? undefined) : undefined,
      select: (queryData) => {
        const pages = queryData.pages as ReviewCursorEnvelopeDto[];
        const flat = pages.flatMap((p) => toReviewItemList(p));
        const header = pages[0]?.header ?? null;
        return { pages, flat, header };
      },
      staleTime: 30_000,
      enabled,
    });

  const { data: reviewCount } = useQuery({
    queryKey: ['storeReviewCount', id],
    queryFn: () => getReviewCount(id!),
    staleTime: 60_000,
    enabled,
  });

  const list = (data as any)?.flat ?? [];
  const headerDto = (data as any)?.header;

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderReviewItem = React.useCallback<ListRenderItem<ReviewItem>>(
    ({ item }) => (
      <ReviewItemView
        userName={item.userName}
        content={item.content}
        images={item.images}
        ownerReply={item.ownerReply}
      />
    ),
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={[styles.header]} onLayout={(e) => setHeaderH(e.nativeEvent.layout.height)}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backBtn}
        >
          <BackArrow />
        </TouchableOpacity>
        <Text style={styles.title}>리뷰</Text>
        <View style={{ width: 24 }} />
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.4 }}
        colors={['rgba(108, 49, 49, 0.08)', 'rgba(0,0,0,0)']}
        style={[styles.topShadow, { top: headerH + insets.top }]}
      />

      {/* 하단 (스크롤) */}
      {isLoading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color={colors.light.main} />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={list}
          keyExtractor={(it) => String(it.id)}
          renderItem={renderReviewItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={() => refetch()} />}
          ListHeaderComponent={
            <ReviewsHeader count={reviewCount ?? list.count} imageUrl={headerDto?.storeImageUrl} />
          }
          ListFooterComponent={hasNextPage ? <ReviewsFooterLoading /> : <ReviewsFooterSpace />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

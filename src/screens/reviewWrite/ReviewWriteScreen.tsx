import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './ReviewWriteScreen.style';
import { KkButton } from '../../design/component/KkButton';
import KkCompleteModal from '../../design/component/KkCompleteModal';
import PhotoSourceSheet from './PhotoSourceSheet';
import Camera from '../../assets/images/camera.svg';
import RemoveIcon from '../../assets/images/removeIcon.svg';
import colors from '../../design/colors';
import Header from '../../design/component/Header';

import { createReview } from '../../api/review';

type Photo = { id: string; uri: string };

const PhotoSeparator = React.memo(() => <View style={{ width: 10 }} />);

export default function ReviewWriteScreen() {
  const router = useRouter();

  const { storeId, storeName } = useLocalSearchParams<{ storeId?: string; storeName?: string }>();
  const parsedStoreId = storeId != null ? Number(storeId) : NaN;
  const numericStoreId = Number.isFinite(parsedStoreId) ? parsedStoreId : undefined;

  const qc = useQueryClient();

  const [content, setContent] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const hasText = content.trim().length > 0;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: { storeId: number; content: string; images: string[] }) =>
      createReview(payload.storeId, payload.content, payload.images),
    onSuccess: async () => {
      // 관련 목록/카운트/프리뷰 무효화
      if (numericStoreId !== null && numericStoreId !== undefined) {
        await Promise.allSettled([
          qc.invalidateQueries({ queryKey: ['storeReviews', String(numericStoreId)] }),
          qc.invalidateQueries({ queryKey: ['storeReviewCount', String(numericStoreId)] }),
          qc.invalidateQueries({ queryKey: ['reviewPreviews', String(numericStoreId)] }),
        ]);
      }
      setSuccessVisible(true);
    },
    onError: () => {
      Alert.alert('리뷰 등록 중 문제가 발생했습니다.');
    },
  });

  const submitting = isPending;
  const MAX_PHOTOS = 5;

  const canSubmit = useMemo(
    () => content.trim().length > 0 || photos.length > 0,
    [content, photos.length],
  );

  // ---- 이미지 선택
  const pickFromLibrary = async (): Promise<void> => {
    try {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('앨범 접근이 허용되지 않았습니다.');
        return;
      }

      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsMultipleSelection: true,
        quality: 0.8,
        legacy: true,
      });

      if (res.canceled || !res.assets?.length) return;

      const tried = res.assets.length; // 방금 사용자가 고른 수
      const current = photos.length; // 이미 담겨 있는 수
      const totalAfter = current + tried; // 총개수
      const overflow = Math.max(0, totalAfter - MAX_PHOTOS); // 초과 개수
      const allow = tried - overflow; // 실제로 추가 가능한 개수

      if (allow <= 0) {
        Alert.alert(`사진은 최대 ${MAX_PHOTOS}장까지 업로드할 수 있어요.`);
        return;
      }
      if (overflow > 0) {
        Alert.alert(`사진은 최대 ${MAX_PHOTOS}장까지`, `${overflow}장은 제외되어 추가됩니다.`);
      }

      const picked = res.assets.slice(0, allow).map((a, i) => ({
        id: `${Date.now()}-${i}`,
        uri: a.uri!,
      }));
      setPhotos((prev) => [...prev, ...picked]);
    } catch (e) {
      console.warn(e);
      Alert.alert('앨범을 불러오는 중 오류가 발생했습니다.');
    } finally {
      setSheetVisible(false);
    }
  };

  const pickFromCamera = async (): Promise<void> => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (!perm.granted) {
        Alert.alert('카메라 접근이 허용되지 않았습니다.');
        return;
      }

      if (photos.length >= MAX_PHOTOS) {
        Alert.alert(`사진은 최대 ${MAX_PHOTOS}장까지 업로드할 수 있어요.`);
        return;
      }

      const res = await ImagePicker.launchCameraAsync({
        quality: 0.8,
      });
      if (res.canceled) return;

      const asset = res.assets?.[0];
      if (!asset?.uri) return;

      setPhotos((prev) => [...prev, { id: `${Date.now()}`, uri: asset.uri }]);
    } catch (e) {
      console.warn(e);
      Alert.alert('카메라 촬영 중 오류가 발생했습니다.');
    } finally {
      setSheetVisible(false);
    }
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const submitReview = async (): Promise<void> => {
    if (!canSubmit || submitting) return;
    if (numericStoreId == null) {
      Alert.alert('가게 정보가 없습니다.');
      return;
    }
    await mutateAsync({
      storeId: numericStoreId,
      content,
      images: photos.map((p) => p.uri),
    });
  };

  // ---- 렌더: 사진 아이템
  const renderPhoto = ({ item }: { item: Photo }) => (
    <View style={styles.photoBox}>
      <Image source={{ uri: item.uri }} style={styles.photo} />
      <TouchableOpacity style={styles.remove} onPress={() => removePhoto(item.id)}>
        <RemoveIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="리뷰 작성" onBackPress={() => router.back()} shadow />

        {/* 스토어 이름 */}
        <View style={styles.storeNameBox}>
          <Text style={styles.storeName}>{storeName ?? '매장명 확인 중..'}</Text>
        </View>

        {/* 사진 영역 */}
        <View style={styles.choiceArea}>
          <TouchableOpacity
            style={styles.rowBetween}
            onPress={() => {
              setSheetVisible(true);
            }}
          >
            <Camera />
            <Text style={styles.sectionTitle}>
              사진 첨부하기 ({photos.length}/{MAX_PHOTOS})
            </Text>
          </TouchableOpacity>
        </View>
        {photos.length > 0 ? (
          <View style={styles.photoArea}>
            <FlatList
              data={photos}
              horizontal
              keyExtractor={(p) => p.id}
              renderItem={renderPhoto}
              ItemSeparatorComponent={PhotoSeparator}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 4, paddingTop: 8 }}
            />
          </View>
        ) : null}

        {/* 텍스트 입력 */}
        <View style={styles.inputArea}>
          <TextInput
            style={[
              styles.input,
              { borderColor: hasText ? colors.light.black : colors.light.gray1 },
            ]}
            value={content}
            placeholder="솔직한 후기와 응원의 한마디는 사장님의 큰 힘이 됩니다 :)"
            placeholderTextColor={colors.light.gray2}
            onChangeText={setContent}
            multiline
            maxLength={1000}
          />
        </View>

        {/* 완료 버튼 */}
        <View style={styles.submitBtn}>
          <KkButton
            label="완료"
            type={canSubmit ? 'primary' : 'disabled'}
            size="large"
            onPress={submitReview}
          />
        </View>
      </ScrollView>

      {/* 사진 소스 시트 */}
      <PhotoSourceSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onPickCamera={pickFromCamera}
        onPickLibrary={pickFromLibrary}
      />

      {/* 성공 모달 */}
      <KkCompleteModal
        visible={successVisible}
        message="리뷰 등록이 완료되었습니다!"
        onClose={() => router.back()}
      />
    </SafeAreaView>
  );
}

import * as Location from 'expo-location';

const KAKAO_REST_API_KEY = process.env.EXPO_PUBLIC_KAKAO_REST_API_KEY;

function withTimeout<T>(fn: () => Promise<T>, ms: number): Promise<T> {
  let t: ReturnType<typeof setTimeout>;
  return Promise.race<T | never>([
    fn(),
    new Promise<never>((_, reject) => {
      t = setTimeout(() => reject(new Error(`위치 조회 타임아웃(${ms}ms)`)), ms);
    }),
  ]).finally(() => clearTimeout(t));
}

// 현재 위치 권한 요청 + 좌표 반환
export async function getCurrentCoords() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('위치 권한 거부됨');
  }

  const loc = await withTimeout(
    () => Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest }),
    5000,
  );

  return { lat: loc.coords.latitude, lng: loc.coords.longitude };
}

// Kakao API로 좌표 → 주소 변환
export async function getAddressFromCoords(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
      { headers: { Authorization: `KakaoAK ${KAKAO_REST_API_KEY}` } },
    );

    if (!res.ok) {
      return '주소 미확인';
    }

    const json = await res.json();
    const region = json?.documents?.[0];
    if (!region) return '주소 미확인';

    return `${region.region_1depth_name} ${region.region_2depth_name} ${region.region_3depth_name}`;
  } catch {
    return '주소 미확인';
  }
}

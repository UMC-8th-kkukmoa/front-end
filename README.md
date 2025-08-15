# 꾹모아 (KkukMoa) — 소상공인 리워드 & 금액권 플랫폼

> 소상공인 매장에서 사용할 수 있는 **모바일 금액권** + **자동 스탬프 적립** 기반 고객 리워드 서비스

<p align="center">
  <img src="https://github.com/user-attachments/assets/8695423b-3de4-4207-8838-49c3c9f74eb4" alt="kkukmoa_poster" width="720"/>
</p>

---

## 💻 FrontEnd Developer

| 김은하 | 이채영 | 정윤철 | 정주연 |
|:------:|:------:|:------:|:------:|
| <img src="https://avatars.githubusercontent.com/u/152863626?v=4" alt="김은하" width="150"> | <img src="https://avatars.githubusercontent.com/u/133013991?v=4" alt="이채영" width="150"> | <img src="https://avatars.githubusercontent.com/u/3233503?v=4" alt="정윤철" width="150"> | <img src="https://avatars.githubusercontent.com/u/118319081?v=4" alt="정주연" width="150"> |
| 성신여대 | 서울여대 | 광운대 | 광운대 |
| [rladmsgki](https://github.com/rladmsgki) | [chae1125](https://github.com/chae1125) | [onebone](https://github.com/onebone) | [juyeonnnn](https://github.com/juyeonnnn) |

---

## ✨ 핵심 기능

- **디지털 금액권 구매·사용**: 원하는 금액의 e-금액권을 구매하고 제휴 매장에서 자유롭게 사용
- **자동 스탬프 적립**: 결제 내역 연동으로 결제 시 자동으로 스탬프 적립
- **맞춤형 서비스 쿠폰**: 스탬프 10개 누적 시 자동 발급 (혜택은 점주가 직접 설정)
- **QR 기반 적립/선물**: 카드 결제도 QR 인식으로 적립, 금액권 선물 가능

---

## 🧭 목차

- [프로젝트 구조](#-프로젝트-구조)
- [기술 스택 & 선정 이유](#-기술-스택--선정-이유)
- [시작하기](#-시작하기-getting-started)
- [개발 워크플로우](#-개발-워크플로우)
- [트러블슈팅](#-트러블슈팅)

---

## 🗂 프로젝트 구조

<details>
<summary><b>📂 src</b></summary>

```plaintext
src
├─ api/                      # 서버 통신 모듈
│   ├─ client.ts
│   ├─ images.ts
│   ├─ kakaoLogin.ts
│   ├─ like.ts
│   ├─ localAuth.ts
│   ├─ logout.ts
│   ├─ owner.ts
│   ├─ reissueTokens.ts
│   ├─ review.ts
│   ├─ shop.ts
│   ├─ stamp.ts
│   ├─ store.ts
│   └─ voucherApi.ts
│
├─ assets/                   # 폰트 & 이미지 리소스
│   ├─ fonts/ Pretendard-*.ttf
│   ├─ images/ (아이콘, 배너, 로고, 샘플 이미지 등)
│   └─ images/logo/ (앱 로고, 네이버 로고)
│
├─ design/
│   ├─ colors.ts              # 전역 색상 정의
│   └─ component/             # 공용 컴포넌트
│       ├─ Header.tsx
│       ├─ KkButton.tsx
│       ├─ ...
│
├─ hooks/                     # 커스텀 훅
│   ├─ useAuth.ts
│   ├─ useLikeStore.ts
│   ├─ ...
│
├─ screens/                   # 페이지 단위 UI
│   ├─ auth/                  # 로그인/회원가입
│   ├─ GiftCard/
│   ├─ main/
│   ├─ myCoupon/
│   ├─ myGiftCard/
│   ├─ mypage/
│   ├─ owner/                 # 점주 페이지
│   ├─ ownerJoinShop/
│   ├─ qrcode/
│   ├─ search/
│   ├─ stamp/
│   └─ Store/                 # 지도 및 매장 관련 화면 & 컴포넌트
│       ├─ CategoryTabs/
│       ├─ KakaoMap/
│       ├─ MapFloatingButtons/
│       ├─ PickLocationScreen/
│       ├─ ReviewCard/
│       ├─ Reviews/
│       ├─ SearchBar/
│       ├─ StoreBottomSheet/
│       ├─ StoreCard/
│       ├─ StoreDetailScreen/
│       └─ StoreScreen/
│
├─ store/                     # Zustand 상태 관리
│   ├─ useAuthStore.ts
│   ├─ useOwnerJoinStore.ts
│   └─ useShopStore.ts
│
├─ types/                     # 전역 타입 정의
│   ├─ auth.ts
│   ├─ kakao.ts
│   ├─ review.ts
│   ├─ stamp.ts
│   ├─ store.ts
│   └─ voucher.ts
│
└─ utils/                     # 유틸 함수
    ├─ location.ts
    └─ tokenStorage.ts
```

</details>

<details>
<summary><b>🧪 __tests__</b></summary>

```plaintext
__tests__
└─ App.test.tsx                # 앱 초기 진입 테스트
```

</details>

---

## 💎 기술 스택 & 선정 이유

| 영역 | 기술 | 선정 이유 |
|---|---|---|
| Language | **TypeScript** | 정적 타입 시스템으로 런타임 에러 감소, 협업 시 안정성↑ |
| Framework | **React Native** | 웹 기술 기반으로 네이티브 앱과 유사한 경험 구현 가능 |
| Dev Platform | **Expo** | 빠른 빌드 & 디버깅, OTA 업데이트 |
| Routing | **Expo Router** | 파일 기반 라우팅, 네비게이션 단순화 |
| State Mgmt | **Zustand** | 가볍고 직관적인 전역 상태 관리 |
| Server State | **React Query** | 캐싱/리페치 최적화, 서버 상태 관리 |
| UI | **@gorhom/bottom-sheet**, **Reanimated** | 네이티브급 제스처/애니메이션 |
| HTTP | **Axios** | 인터셉터 기반 토큰/에러 처리 |
| Styling | **StyleSheet** | 컴포넌트 단위 스타일 관리 |
| 품질 | **ESLint + Prettier (Airbnb)** | 코드 스타일 일관성 유지 |
| 협업 | **Husky** + **Git Hooks** | 커밋 전 린트/포맷 자동 실행 |

---

## ⚡ 시작하기 (Getting Started)

```bash
# 1. 의존성 설치
npm install

# 2. Android 실행
npx expo run:android
```

---

## 🤝 개발 워크플로우

- **브랜치 전략**: Git Flow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`)
- **커밋 컨벤션**: `type: summary` → feat, fix, docs, style, refactor, test, chore
- **PR 규칙**: 제목 `[요약] (#이슈번호)`, 스크린샷 포함, 최소 2인 리뷰
- **자동화**: Husky + Lint/Format, GitHub Actions → Discord 알림

---

## 🧩 트러블슈팅

---

### 1) Expo ↔ RN 버전 불일치
**상황**  
Expo SDK와 React Native 버전이 맞지 않아 빌드/실행 시 오류 발생

**원인**  
Expo SDK와 RN의 버전 매트릭스 불일치

**해결**  
Expo 공식 문서에서 버전 매트릭스 확인 후 동일하게 맞춤  
`node_modules` 및 캐시 삭제 후 재설치

---

### 2) WebView 버전 충돌 (결제 SDK ↔ 지도)
**상황**  
`@tosspayments/widget-sdk-react-native`가 요구하는 `react-native-webview` 버전과  
카카오 지도에서 요구하는 버전이 달라 빌드 충돌 발생

**원인**  
두 라이브러리가 서로 다른 WebView 메이저/마이너 버전을 강제함

**해결**  
결제 기능은 백엔드에서 제공하는 **별도 결제 페이지**를  
인앱 브라우저 또는 외부 브라우저로 열어 처리하도록 변경  
→ 지도는 기존 WebView 버전 유지, 결제는 앱 업데이트 없이 백엔드에서 대응 가능

---

### 3) `@gorhom/bottom-sheet` 흰 화면
**상황**  
`@gorhom/bottom-sheet` 적용 후 앱 실행 시 흰 화면 표시

**원인**  
Reanimated/Babel 설정 누락 또는 초기화 순서 문제

**해결**  
Babel 플러그인 순서 수정(`react-native-reanimated/plugin` 마지막에 위치)  
`GestureHandlerRootView` 적용  
최소 재현 코드로 테스트

# <img width="30" height="30" alt="앱로고" src="https://github.com/user-attachments/assets/9b121bc4-21d5-4793-919e-6b908d2a8ee1" /> 꾹모아 소개
<img width="450" height="300" alt="kkukmoa_poster" src="https://github.com/user-attachments/assets/8695423b-3de4-4207-8838-49c3c9f74eb4" />
<br/>

**꾹모아는 소상공인 매장에서 사용할 수 있는 모바일 금액권 및 스탬프 적립 기반 고객 리워드 플랫폼입니다.**
- **디지털 금액권 구매 및 사용**
    - 원하는 금액의 e-금액권을 구매하여 입점 매장에서 자유롭게 사용합니다.
- **자동 스탬프 적립 시스템**
    - 결제 내역과 연동되어 스탬프가 자동으로 적립됩니다.
- **맞춤형 서비스 쿠폰**
    - 스탬프 10개 누적 시 자동 발급되며, 매장별 사장님이 직접 혜택을 설정합니다.
- **QR 코드 기반 적립 및 선물**
    - 카드 결제 시에도 QR 인식으로 스탬프 적립이 가능하며, 금액권을 선물할 수 있습니다.

<br/>
<br/>

## 💻 FrontEnd Developer
| 김은하 | 이채영 | 정윤철 | 정주연 |
|:------:|:------:|:------:|:------:|
| <img src="https://avatars.githubusercontent.com/u/152863626?v=4" alt="김은하" width="150"> | <img src="https://avatars.githubusercontent.com/u/133013991?v=4" alt="이채영" width="150"> | <img src="https://avatars.githubusercontent.com/u/3233503?v=4" alt="정윤철" width="150"> | <img src="https://avatars.githubusercontent.com/u/118319081?v=4" alt="정주연" width="150"> |
| 성신여대 | 서울여대 | 광운대 | 광운대 |
| [rladmsgki](https://github.com/rladmsgki) | [chae1125](https://github.com/chae1125) | [onebone](https://github.com/onebone) | [juyeonnnn](https://github.com/juyeonnnn) |


<br/>
<br/>

## 🛠️ 프로젝트 구조
```plaintext

```

<br/>
<br/>

## 💎 기술 스택 + 선정 이유
**Language** 
* TypeScript: 정적 타입 지원으로 코드 안정성과 가독성을 높이기 위함
**Framework**
* React Native : 하나의 코드베이스로 iOS/Android 크로스 플랫폼 개발 가능. 추후 iOS로의 확장 가능성 고려
**Tools**
* Android Emulator / Expo CLI : 실제 디바이스 없이 빠른 테스트와 빌드 가능
**Routing / Library**
* Expo Router: 화면 전환과 네비게이션을 간편하게 관리 가능

<br/>

## 📓 협업
* Git
* Notion
* Discord

<br/>

## 📌 협업 규칙
- **GitHub 브랜치 전략**:
    - Git Flow (main, develop, feature, release, hotfix)
    - 브랜치 네이밍 규칙:
        - 예) feat/[기능명]-[이슈번호]
- **Commit 메시지 규칙**:
    - 형식: [타입]: [요약] , 예: feat: 로그인 기능 추가
    - 주요 타입: feat, fix, docs, style, refactor, test, chore
- **PR 및 코드 리뷰**:
    - PR 제목 형식: [요약] ([이슈번호])
    - 최소 2명 리뷰 필수
    - 작업 내용 및 스크린샷 공유
- **코드 스타일 및 린트 규칙**:
    - ESLint, Prettier (Airbnb 스타일)
- **GitHub Projects 태스크 관리**:
    - 진행 상황 한눈에 파악, 효율적인 협업 지원

<br/>
<br/>

## 🚨 개발 중 겪은 어려움과 해결 과정
- Expo를 설치하면서 생긴 버전 불일치 문제
    - 설치한 React Native와 Expo 사이에 버전이 호환되지 않는 문제가 있었음
    - 인터넷을 뒤져가며 버전 하나하나씩 시도해가면서 문제를 해결해봄
- `@gorhom/bottom-sheet` 적용 후 앱 실행 시 흰 화면만 뜨는 오류 발생
    - 기본 설정(`babel.config.js`, `GestureHandlerRootView` 등) 모두 확인 → 문제 없었음
    - `@gorhom/bottom-sheet` / `react-native-reanimated`버전 호환성 의심 → 여러 조합 테스트했지만 동일 증상
    - `BottomSheet` 전체를 주석 처리했더니 앱 정상 실행됨
    - `BottomSheet` 자체가 초기화 시점에서 죽는 상황이라고 판단하여 최소 코드로 BottomSheet만 테스트하며 [**이 링크**](https://hururuek-chapchap.tistory.com/259)를 참고하여 해결함

<br/>

## 🤖 AI 활용 방식
- **Code Rabbit 기반 코드 리뷰 자동화 도입**
    - 리뷰 시간을 획기적으로 단축
    - 구체적이고 실질적인 피드백 제공
    - 개발자 생산성 및 코드 품질 향상

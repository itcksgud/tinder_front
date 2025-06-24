
# 🔥 Tinder Clone Frontend (React Native)

이 프로젝트는 React Native 기반의 Tinder 스타일 데이팅 앱 클론입니다.  
**로그인 및 인증 기능은 완성되었으며**, UI 틀과 주요 화면도 구성되어 있습니다.  
**다만 위치 기반 매칭 및 채팅 기능은 미완성** 상태입니다.

> 백엔드와 연동되며, Expo 기반으로 실행됩니다.

---

## ✅ 구현된 기능

- 사용자 회원가입 및 로그인
- 토큰 기반 인증 처리 (AuthContext)
- 회원가입 후 이메일 인증
- 메인 화면 UI 스켈레톤 구성
- 화면 간 네비게이션 연결

---

## ❌ 미완성 / 추후 구현 예정

- 위치 기반 사용자 매칭
- 실시간 채팅 기능 (소켓 or Firebase 예상)
- 프로필 카드 스와이프 및 매칭 로직
- 사용자 설정 / 프로필 수정 화면

---

## 🧱 주요 기술 스택

- React Native
- Expo
- React Navigation
- Context API (Auth 관리)
- Axios (API 통신)
- Typescript

---

## 📂 폴더 구조

```bash
tinder_front/
├── src/
│   ├── api/              # API 요청 모듈
│   ├── context/          # AuthContext 등 글로벌 상태
│   ├── navigation/       # Stack/Tab 네비게이션 설정
│   └── screens/          # 화면들 (Auth, Main 등)
├── App.tsx
└── ...
````

---

## 🛠️ 실행 방법

```bash
# 터미널 1
npx expo start

#터미널 2
npx expo run:android --port 8082
```

> Expo Go 앱 또는 Android/iOS 에뮬레이터에서 실행 가능

---



> 백엔드가 실행 중이어야 로그인 가능, tinder_front\src\api\index.ts에서 주소 설정정

---

## 📌 백엔드 저장소

[tinder\_back GitHub 링크](https://github.com/itcksgud/tinder_back)

---

## 📢 참고 사항

* 시간 부족으로 기능이 완성되지 않았지만, 전체적인 앱 흐름과 인증 구조는 구성되어 있습니다.
* 채팅 및 위치 기반 기능은 백엔드 연동 또는 Firebase 등을 이용해 추후 추가 가능성을 염두에 두고 있습니다.

---


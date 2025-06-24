// metro.config.js (프로젝트 루트에 위치)
const { getDefaultConfig } = require('expo/metro-config');  
// 1. Expo가 제공하는 기본 Metro 설정을 가져옵니다 :contentReference[oaicite:0]{index=0}

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);  
// 2. __dirname(=프로젝트 루트)을 기반으로 기본 설정을 초기화합니다 :contentReference[oaicite:1]{index=1}

/*
  3. 자산 확장자 목록에 png, jpg, jpeg 외에
     추가로 불러오고 싶은 확장자가 있다면 여기서 push 해 줍니다.
     예를 들어 gif를 사용하고 싶다면 아래처럼 추가하세요.
*/
config.resolver.assetExts.push('png', 'jpg', 'jpeg', 'gif');  
// 4. assetExts에 원하는 확장자를 추가합니다 :contentReference[oaicite:2]{index=2}

// 5. 최종 설정을 모듈로 내보냅니다
module.exports = config;  

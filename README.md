<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React & Redux 데스크탑 장바구니 애플리케이션</p>
</p>

## 🚀 Getting Started

> 다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

✔️ `데스크탑 타겟`의 웹 앱을 구현하며 구매로 이어지는 것에 끊김이 없고 `재방문을 고려한 UI/UX`에 대해 고민해봅니다.  
✔️ 상태 관리를 위해 `Flux Architecture` 기반의 `Redux`를 활용합니다.  
✔️ `Router`를 활용해 여러 페이지 전환을 고려합니다.  
✔️ [배민상회](https://mart.baemin.com) 서비스 참고

## 👏 Contributing

만약 미션 수행 중에 개선사항이 보인다면, 언제든 자유롭게 PR을 보내주세요.

<br>

## 🐞 Bug Report

버그를 발견한다면, [Issues](https://github.com/woowacourse/react-shopping-cart/issues)에 등록해주세요.

## Step1

🚀 Getting Started
다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

✔️ 데스크탑 타겟의 웹 앱을 구현합니다.
✔️ 상태 관리를 위해 Recoil을 활용합니다.
✔️ Router를 활용해 여러 페이지 전환을 고려합니다.
✔️ 배민상회 서비스 참고
🗄 Github Repository
🗂 Figma

📝 필수 요구 사항

1. 상품 목록 페이지

- [x] 상품 목록 페이지에 필요한 UI 마크업
      header의 숫자 표시를 통해 장바구니에 담긴 품목의 갯수 표시

2. 전역 상태 관리

- [x] recoil을 사용하여 전역 상태 관리

3. mock 데이터 활용

- [x] Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고

4. 테스트 도구 선정

- [x] 적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

✅ 프로그래밍 요구사항
이전 미션의 프로그래밍 요구사항은 기본으로 포함한다.

Readability

- [x] API 요청을 처리하는 공통 함수나 커스텀 훅을 작성하여 재사용 가능하게 만든다.
- [ ] 페이지간 공통 스타일이 있는 경우 재사용한다.
      Reusability
- [ ] 서버와의 통신을 담당하는 코드와 UI를 렌더링 하는 코드를 분리하여 관심사를 분리한다.
- [ ] 에러 처리 로직을 명확하게 작성하여 코드의 가독성을 높인다.
      Performance
- [ ] 불필요한 상태 관리를 최소화하고, 상태 업데이트를 최적화한다.
- [ ] 컴포넌트의 리렌더링을 최소화하기 위해 memoization을 적용한다.

📁 라이브러리
tailwindcss와 유틸성이 강한 라이브러리를 제외하고는 미션 해결을 위해 사용해도 괜찮습니다.
ex) styled-components, react-router-dom 등

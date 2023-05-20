<h1 align="middle">🛒 장바구니 🛒</h1>
<p align="middle">우아한테크코스 레벨2 장바구니 미션</p>

<br>

### Step 1

<img width="416" alt="image" src="https://github.com/Leejin-Yang/react-modal-hp/assets/78616893/4c8e36f6-ed86-4ca2-831c-b4006ab34dc8">

### Step 2

<img width="416" alt="image" src="https://github.com/hae-on/woowacourse/assets/80464961/fb9639fa-e196-4e38-850f-0f31a6bacb89">

<br>

### 🧑‍🤝‍🧑 페어 (페어 프로그래밍으로 개발)

<table>
  <tr>
    <td align="center" width="120px">
      <a href="https://github.com/leejin-yang" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/78616893?v=4" alt="황펭(양이진) 프로필" />
      </a>
    </td>
    <td align="center" width="120px">
      <a href="https://github.com/hae-on" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/80464961?v=4" alt="해온(백솔비) 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/leejin-yang" target="_blank">
      황펭(양이진)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hae-on" target="_blank">
        해온(백솔비)
      </a>
    </td>
  </tr>
</table>

<br>

### 📍 학습 목표

다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

- 데스크탑 타겟의 웹 앱을 구현합니다.
- 상태 관리를 위해 Recoil을 활용합니다.
- Router를 활용해 여러 페이지 전환을 고려합니다.
- MSW를 이용하여 API를 Mocking하고 리액트에서 비동기 상황에 대해 고민해 봅니다.

<br>

### 📝 실행 방법

- <a href="https://hae-on.github.io/react-shopping-cart/">앱 바로 실행하기</a>

- <a href="https://hae-on.github.io/react-shopping-cart/storybook">스토리북 바로 실행하기</a>

- 터미널에서 npm 설치(`npm install`) 후 `npm start` 커맨드로 앱을 실행할 수 있다.

<br>

### 🎯 기능 목록

### Step 1

1. 상품 목록 페이지
   상품 목록 페이지에 필요한 UI 마크업
   header의 숫자 표시를 통해 장바구니에 담긴 품목의 갯수 표시

2. 전역 상태 관리
   recoil을 사용하여 전역 상태 관리

3. mock 데이터 활용
   Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고

4. 테스트 도구 선정
   적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

### Step 2

1. 장바구니 페이지
   장바구니 페이지 마크업을 완성하고, 상품 목록 페이지와 함께 모바일 환경 대응

2. MSW를 활용한 API Mocking
   MSW를 활용하여 실제 서버와 연동될 수 있는 API Mocking을 구현
   단순한 Endpoint 변경으로 실제 API 사용이 가능하도록 작업
3. 테스트
   장바구니 페이지에서 다양한 사용자 인터렉션에 대한 테스트 케이스를 고민하고, 선택한 테스트 도구를 이용하여 검증
4. 사용자 경험
   새로고침 해도, 장바구니에 담은 상품 유지

<br>

### ✅ 프로그래밍 요구 사항

가독성과 재사용성을 유의하며 기능을 구현한다.

- **Readability**

- API 요청을 처리하는 공통 함수나 커스텀 훅을 작성하여 재사용 가능하게 만든다.
- 페이지간 공통 스타일이 있는 경우 재사용한다.

- **Reusability**

- 서버와의 통신을 담당하는 코드와 UI를 렌더링 하는 코드를 분리하여 관심사를 분리한다.
- 에러 처리 로직을 명확하게 작성하여 코드의 가독성을 높인다.

- **Performance**

- 불필요한 상태 관리를 최소화하고, 상태 업데이트를 최적화한다.
- 컴포넌트의 리렌더링을 최소화하기 위해 memoization을 적용한다.

   <br>

---

<a href="https://github.com/woowacourse">@woowacourse</a>

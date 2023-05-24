<p align="middle" >
  <img src="https://techcourse-storage.s3.ap-northeast-2.amazonaws.com/3e6c6f30b11d4b098b5a3e81be19ce3a" width="400">
</p>
<h2 align="middle">Level2 - 장바구니</h2>
<p align="middle">React & Recoil 데스크탑 장바구니 애플리케이션</p>
</p>

### 결과물: [장바구니🛒](https://hozzijeong.github.io/react-shopping-cart/)

## 🚀 학습 목표

> 다수의 컴포넌트를 페이지로 구성하고 복잡해진 상태를 관리합니다.

✔️ `데스크탑 타겟`의 웹 앱을 구현하며 구매로 이어지는 것에 끊김이 없고 `재방문을 고려한 UI/UX`에 대해 고민해봅니다.  
✔️ 상태 관리를 위해 `Recoil`을 활용합니다.
✔️ `Router`를 활용해 여러 페이지 전환을 고려합니다.  
✔️ [배민상회](https://mart.baemin.com) 서비스 참고

### 📝 1단계 기능 목록

1. 상품 목록 페이지
   - 상품 목록 페이지에 필요한 UI 마크업
   - header의 숫자 표시를 통해 장바구니에 담긴 상품 종류의 갯수 표시
2. 전역 상태 관리
   - recoil을 사용하여 전역 상태 관리
3. mock 데이터 활용
   - Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고
4. 테스트 도구 선정
   - 적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

### 📝 2단계 기능 목록

1. 장바구니 페이지
   - 장바구니 페이지 마크업을 완성하고, 상품 목록 페이지와 함께 모바일 환경 대응
2. MSW를 활용한 API Mocking
   - MSW를 활용하여 실제 서버와 연동될 수 있는 API Mocking을 구현
   - 단순한 Endpoint 변경으로 실제 API 사용이 가능하도록 작업
3. 테스트
   - 장바구니 페이지에서 다양한 사용자 인터렉션에 대한 테스트 케이스를 고민하고, 선택한 테스트 도구를 이용하여 검증
4. 사용자 경험
   - 새로고침 해도, 장바구니에 담은 상품 유지

### 💻 페어프로그래밍

| <img src="https://avatars.githubusercontent.com/u/50974359?v=4" width=150px> | <img src="https://avatars.githubusercontent.com/u/55427367?v=4" width=150px> |
| :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|                     [클린](http://github.com/hozzijeong)                     |                     [타미](http://github.com/xodms0309)                      |

### 🌲 파일 구조

```
📦src
 ┣ 📂api
 ┃ ┗ 📜index.ts
 ┣ 📂components
 ┃ ┣ 📂@common
 ┃ ┃ ┣ 📂CheckBox
 ┃ ┃ ┃ ┣ 📜CheckBox.stories.tsx
 ┃ ┃ ┃ ┣ 📜CheckBox.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂ContentLayout
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Counter
 ┃ ┃ ┃ ┣ 📜Counter.stories.tsx
 ┃ ┃ ┃ ┣ 📜Counter.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Spinner
 ┃ ┃ ┃ ┣ 📜Spinner.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Svg
 ┃ ┃ ┃ ┣ 📜SvgSprite.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂Toast
 ┃ ┃ ┃ ┣ 📜Toast.stories.tsx
 ┃ ┃ ┃ ┣ 📜Toast.styles.ts
 ┃ ┃ ┃ ┣ 📜ToastPortal.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂Cart
 ┃ ┃ ┣ 📂CartItem
 ┃ ┃ ┃ ┣ 📜CartItem.stories.tsx
 ┃ ┃ ┃ ┣ 📜CartItem.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂CartList
 ┃ ┃ ┃ ┣ 📜CartList.stories.tsx
 ┃ ┃ ┃ ┣ 📜CartList.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┗ 📂OrderInfo
 ┃ ┃ ┃ ┣ 📜OrderInfo.stories.tsx
 ┃ ┃ ┃ ┣ 📜OrderInfo.styles.ts
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂ProductItem
 ┃ ┃ ┣ 📜ProductItem.stories.tsx
 ┃ ┃ ┣ 📜ProductItem.styles.ts
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useCartListUpdate.ts
 ┃ ┣ 📜useCartUpdate.ts
 ┃ ┣ 📜useFetch.ts
 ┃ ┗ 📜useToast.tsx
 ┣ 📂mocks
 ┃ ┣ 📂data
 ┃ ┃ ┣ 📜cartList.json
 ┃ ┃ ┗ 📜productList.json
 ┃ ┣ 📜browser.ts
 ┃ ┗ 📜handlers.ts
 ┣ 📂pages
 ┃ ┣ 📜ProductList.tsx
 ┃ ┗ 📜ShoppingBasket.tsx
 ┣ 📂recoil
 ┃ ┣ 📂atom
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂selector
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂router
 ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyle.ts
 ┃ ┣ 📜styles.d.ts
 ┃ ┗ 📜theme.ts
 ┣ 📂types
 ┃ ┗ 📜index.ts
 ┣ 📂utils
 ┃ ┣ 📜constants.ts
 ┃ ┣ 📜index.ts
 ┃ ┗ 📜storage.ts
 ┣ 📜App.tsx
 ┣ 📜index.tsx
 ┗ 📜react-app-env.d.ts
```

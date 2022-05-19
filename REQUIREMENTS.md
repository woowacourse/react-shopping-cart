## 📄 step2 요구사항 정리

## 필수요구사항

- [ ] 단위테스트 진행하기

- [ ] MSW를 활용해 API mocking하기
  - [x] productList msw 로 api mocking
  - [x] productItem msw 로 api mocking

## 필수 구현 페이지

- [ ] 장바구니

  ### 장바구니 페이지

  - [x] Title 컴포넌트

  - [x] 결제예상 금액 컴포넌트

  - [x] Cart 컴포넌트

  - [x] CartProductItem 컴포넌트

  - [x] CountModal 컴포넌트

  - [x] CheckBox 컴포넌트

## 기능 요구 사항

### 장바구니

- [ ] 장바구니에 대한 데이터는 redux를 통해서 구현한다.

### 상품 추가

- [x] 상품 리스트 페이지에서 장바구니 버튼 클릭시 장바구니에 추가되기

- [x] 제품 상세 페이지에서 장바구니 버튼 클릭시 장바구니에 추가되기

- [ ] 장바구니 버튼, 카트 버튼, 장바구니 페이지 내의 ▴ 버튼 클릭시 상품 수량이 1개씩 증가한다.

- [ ] 장바구니 페이지 내에서 상품 수량이 1일때, ▾ 버튼을 클릭한다면, alert창으로 경고메세지를 보낸다

### 상품 삭제

- [ ] 상품 삭제 버튼을 눌렀을 때에 check된 상품들을 장바구니 스토어에서 삭제한다

### 추가 반영 사항

- [ ] 서버에서 api를 받아올때 캐싱 방법 사용하기

## 📄 step1 요구사항 정리 (록바💪🏽 X 샐리😎)

### 공통

- [x] baseURL을 설정한다.
- [x] 라우터를 연결한다.

<br>

### 상품 목록 페이지

- [x] 상품 목록 페이지를 볼 수 있다.
- [x] json-server을 활용해서 데이터를 관리한다.

<br>

### 컴포넌트 구성

- [x] Button 컴포넌트
- [x] Header 컴포넌트
- [x] Layout 컴포넌트
- [x] Styled 컴포넌트
- [x] NotFound 컴포넌트
- [x] Product 컴포넌트
- [x] ProductList 컴포넌트
- [x] ProductDetail 컴포넌트

<br>

### 테스트

- [x] `Storybook`를 이용해서 상호 작용 테스트를 한다.

<br>

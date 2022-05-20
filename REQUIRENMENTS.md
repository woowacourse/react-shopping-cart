# Step1

- [x] CDD - 컴포넌트 개발
  - [x] Header 컴포넌트 만들기
  - [x] MenuItem 컴포넌트 만들기
  - [x] ProductItem 컴포넌트 만들기
  - [x] ProductsContainer 컴포넌트 만들기
  - [x] ProductList Page 컴포넌트 만들기
- [x] Mock Data 만들기

- [x] redux 적용

  - [x] redux-thunk 적용
  - [x] axios 적용

- [x] 데이터 로딩 시 스켈레톤 UI를 보여준다.
- [x] 데이터가 비어 있을 시 비어있음 이미지를 보여준다.
- [x] API 에러 발생 시 에러 이미지를 보여준다.

- [x] 라우팅(상품목록, 상품상세, 장바구니)
- [x] 상품 상세 페이지

  - [x] UI 컴포넌트 작성
  - [x] 상품 목록에서 상품 클릭 시 id를 받아서 해당 상품 상세 페이지로 라우팅 및 렌더링
  - [x] product 리듀서 만들기

- [x] 공통컴포넌트 레이아웃 Outlet으로 리팩토링
- [x] 커스텀 훅 (dispatch, useSelector) 만들기
- [x] 상품상세 페이지를 보고 뒤로가기하면 불필요하게 다시 API 요청하지 않도록 만들기
- [x] 스토리북 정상 작동하게 만들기
- [x] Not Found Page 작성

- [x] cart 리듀서 만들기
- [x] 장바구니 넣기 기능(같은 아이템을 중복으로 장바구니에 넣을 경우 수량을 1개씩 증가한다)

<br/>

# Step 2

- [x] MSW를 활용해 API mocking
  - [x] 상품 리스트 가져오는 API 작성 (GET)
  - [x] 개별 상품 가져오는 API 작성 (GET)
  - [x] 장바구니 담기 API 작성 (POST)
  - [x] 장바구니 가져오는 API 작성 (GET)
- [x] 장바구니 페이지
  - [x] CartItem 컴포넌트 만들기
  - [x] CartContainer 컴포넌트 만들기
  - [x] PaymentBox 컴포넌트 만들기
  - [x] Title 컴포넌트 만들기
  - [x] CheckBox 컴포넌트 만들기
- [x] 단위 테스트 작성
  - [x] 리듀서 테스트
  - [x] useReduxState 테스트

# 데모페이지

- [데모페이지](https://nimble-figolla-852c84.netlify.app/)
- [스토리북 배포페이지](https://627cd06ea27170004a54a0ed-txsykezezl.chromatic.com/)

# 로컬 구동 방법

- 로컬에서 구동할 경우 프로젝트 루트 경로에서 다음 스크립트를 실행하여 `.env` 파일을 추가해주세요.
  - `echo "REACT_APP_API_URL=https://shopping-cart-json-server123.herokuapp.com" > .env`
- 로컬 구동 스크립트 `npm i && npm run start`

# 장바구니

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
- [ ] 장바구니 페이지

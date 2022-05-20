# 우아한테크코스 FE 레벨2 장바구니 미션

- 마르코
- step1 페어 : 호프

## 데모페이지

- [step2 데모페이지](https://cute-dragon-0fd6d5.netlify.app/)
- [step1 데모페이지](https://nimble-figolla-852c84.netlify.app/)
- [step1 스토리북 배포페이지](https://627cd06ea27170004a54a0ed-txsykezezl.chromatic.com/)

## 로컬 구동 방법

- 로컬에서 구동할 경우 프로젝트 루트 경로에서 다음 스크립트를 실행하여 `.env` 파일을 추가해주세요.
  - `echo "REACT_APP_API_URL=https://react-shopping-cart-marco.herokuapp.com" > .env`
- 로컬 구동 스크립트 `npm i && npm run start`

## step2 장바구니 요구사항 정리

`(필수)`라고 적혀있지 않은 요구사항은 심화 요구사항임.

- [x] (필수) MSW를 활용하여 API Mocking
  - [x] Endpoint만 변경하면 언제든 Real API를 바라볼 수 있도록 구현(Real API 없이 로컬에서만 동작하는 상태로 리뷰받을 수 있어야 함)
- [x] 페이지 구현
  - [] (필수) 장바구니 페이지 : Cart
    - [x] TitleHeader : 페이지별 타이틀 텍스트를 표시함. 여러 컴포넌트에서 사용됨(props는 children).
    - [x] CartTable : 장바구니 테이블로서 내부에 장바구니 상품 상태에 따라 CartItem 컴포넌트가 렌더링됨(props는 cartList)
    - [x] CartItem : 장바구니에 담긴 각각의 상품의 수량 설정 및 선택을 할 수 있음(props는 item)
    - [x] 체크박스 기능
      - [x] Checkbox 컴포넌트를 분리한다.
      - [x] 체크된 상품들의 id들을 배열인 checkedIdList는 Cart 컴포넌트에서만 알면 되며 useState로 관리한다.
      - [x] 체크박스에는 해당 상품의 id가 전달되며, onChange될때마다 checked에 기존 상태(isChecked)의 반대값이 저장되며, checkedIdList에 접근하여 해당 id가 없으면 push하고 해당 id가 있으면 나머지 id들만 filter한다.
      - [x] totalCount는 checkedIdList의 length이다.
      - [x] 해당 id들의 배열(checkedIdList)과 redux(api에서 받은)에서 가져온 cart객체들(cart)의 배열을 통해 totalPrice를 setState한다.
    - [x] 상품 삭제 버튼
      - [x] useDelete 커스텀훅을 만든다.
        - [x] 상품 삭제 버튼 클릭 시 API에 DELETE 요청을 하고, 다시 API에서 cartList를 get한다. (cartList가 바뀌면 재렌더링된다)
        - callDeleteApi 성공시 dispatch(getCartAsync)하여 cartList 갱신
      - [x] 개별 상품 삭제 버튼 클릭 시 해당 상품 id를 갖고 useDelete의 callDeleteApi한다.
      - [x] 상단 상품 삭제 버튼 클릭 시 선택된 상품들의 checkedIdList를 갖고 useDelete의 callDeleteApi를 돌린다
    - [x] 상품 수량 변경 인풋 버튼
      - [x] input element의 stepUp, stepDown 메서드를 사용한다
      - [x] 수량 변경 버튼 클릭 시 API에서 cartList의 해당 상품 수량(cartQuantity)이 변경된다.(patch)
      - [x] usePatch 훅을 만든다.
    - [x] 장바구니를 담으면 Header의 장바구니 메뉴 옆에 숫자가 증가한다.
  - [] 주문/결제 페이지
  - [] 주문 목록 페이지
  - [] 주문 상세 페이지
- [] 컴포넌트 구현

-
- [] UI/UX
  - [x] 사용자를 위한 로딩 환경 개선
  - [] 페이징 혹은 인피니티 스크롤 적용 (별도의 API 없음)
  - [] 뒤로가기 및 페이지 전환시 기존 페이지 및 스크롤 위치 기억
  - [x] API 요청 실패에 대한 Edge Case 대응
  - [x] 상품이 없을 때와 같은 다양한 Edge Case 대응
  - [x] 반응형 레이아웃 구현
  - [] 별도의 모바일 레이아웃 추가 제공

## step1 장바구니 구현사항

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

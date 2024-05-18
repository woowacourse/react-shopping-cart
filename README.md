# 🎯 1단계 Refactoring

- [x] updateCartItemQuantity, deleteCartItem - API 반환값 사용

# 🎯 쇼핑 카트 1단계 기능 구현 목록

step 1. API 호출 데이터 확인

- [x] `/cart-item`에 GET 요청으로 장바구니 목록 조회
- [x] `/cart-item`에 PATCH 요청으로 장바구니 상품별 수량 변경
- [ ] `/cart-item`에 POST 요청으로 장바구니에 상품 추가
- [x] `/cart-item/{id}`에 DELETE 요청으로 장바구니에 상품 제거

step 2. react-router 세팅

- [x] CommonLayout 만들기
- [x] cart 페이지 만들기
- [x] checkout 페이지 만들기

step 3. cart, checkout, NotFound 페이지 레이아웃 작업

- [x] Header 컴포넌트
- [x] Button 컴포넌트 (home 버튼, footer 버튼)
- [x] cart 페이지 조합
- [x] checkout 페이지 조합
- [x] NotFound 페이지 추가

step4. cart 페이지 Item 목록

- [x] cart 목록 api 요청 후 recoil selector로 저장
- [x] cart 페이지 UI
- [x] cart item이 아무것도 없을 때, 빈 장바구니 표시
- [x] cart item 삭제 기능

step5. 상태 관리

- [x] 각 item의 quantity atom 전역 변수 productQuantityState
- [x] 전체 주문 금액 selector 전역 변수 totalOrderAmountState
- [x] 각 item의 isChecked 상태를 atomFamily 전역변수 isCheckedState 로 저장
- [x] isChecked 상태를 로컬스토리지와 동기화
- [x] 전체 선택 기능 추가

  - [x] 전체 선택 클릭시 모두 선택, 모두 해제
  - [x] 전체 선택 체크일 때, 하나의 Item 해제 시 전체 선택도 해제
  - [x] 전체 선택이 해제일 때, 모든 Item 체크 시 전체 선택도 체크

- [x] 전체 주문 금액 전역 변수
- [x] 전체 상품 종류 및 갯수 전역 변수

step6. checkout 페이지

- [x] 페이지 UI 레이아웃
- [x] router state로 보낸 전체 상품 종류 및 갯수 받아 렌더링

# CSS 라이브러리

- css module

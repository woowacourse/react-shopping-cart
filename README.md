# 🎯 2단계 Refactoring

- [x] fetch 요청 함수의 반환값을 response를 반환하여 사용하는 곳에서 활용하도록 변경
- [x] fetch 요청하는 부분에서 error catch하여 핸들링하는 로직 추가

- [x] API 요청 endpoint 상수화

# 🎯 쇼핑 카트 2단계 기능 구현 목록

step 4 : Payments 페이지

- [x] 총 주문 금액, 총 주문 상품 수, 종류 UI 렌더링
- [x] 해당 페이지에서 결제하기 버튼을 누르면 /order 요청을 보냄
- [x] 결제 요청 후 성공 시, 장바구니 reset
- [x] mockCoupons -> api의 "/coupons" GET 요청 데이터로 교체
- [ ] 상품 추가 버튼 만들기

step 3 : 적용된 쿠폰 계산 로직 구현

- [x] checkout 중인 상품들에 선택한 쿠폰 적용

  - [x] 한 상품에는 하나의 쿠폰 적용
  - [x] 쿠폰 적용 시나리오 중 가장 할인 금액이 큰 경우로 할인

- [x] 총 할인 금액 계산 후 UI에 렌더링
- [x] 주문 금액에서 할인 금액을 뺀 금액을 총 결제 금액으로

- [x] 배송비 계산 로직

  - [x] 장바구니 페이지에서는 기본 배송비 표시
  - [x] 체크아웃 페이지에서는 추가 배송비 선택 및 표시

- [x] 배송비 쿠폰 할인 금액 적용
  - [x] 배송비가 3000원이면 배송비 쿠폰 사용시 3000원 할인
  - [x] 배송비가 0원일때, 쿠폰 할인 금액에 포함되지 않도록
  - [x] 배송비가 6000원이어도 0원으로 만들고 할인 금액에 포함되도록

step 2 : 쿠폰 선택 UI 구현

- [x] 쿠폰 선택시, 해당 쿠폰을 selected 상태로 변경 (couponSelected Atom)
- [x] 쿠폰 선택시, 해당 쿠폰을 activeCoupons Atom에 추가
- [x] checkout 페이지를 렌더링시, 쿠폰 상태 전역 변수 초기화
- [x] 쿠폰 2개를 선택했으면 나머지 선택되지 않은 쿠폰 UI를 disable 상태로 변경
- [x] 주문 금액, 상품 선택에 따른 사용 가능, 불가능 쿠폰 구분
  - [x] 사용 불가능한 쿠폰의 UI를 disable 상태로 변경(사용 가능, 불가능한 쿠폰 배열을 각각 제공)

step 1 : checkout 페이지 UI 구성

- [x] 기존의 checkout 페이지를 payments 페이지로 이름 변경
- [x] checkout 페이지 생성 및 라우팅
- [x] checkout 페이지 title 컴포넌트 UI
- [x] checkout 페이지 상품 목록 UI
- [x] checkout 페이지 쿠폰 모달 버튼 UI
- [x] checkout 페이지 배송 정보 체크박스 UI
  - [x] 배송 정보를 담은 shippingFeeStatusState 생성
- [x] checkout 페이지 Totals UI
- [x] 이전 미션의 모달 라이브러리 설치
- [x] checkout 페이지 쿠폰 모달 UI

# 🎯 1단계 Refactoring

- [x] isChecked의 localStorage 동기화 로직(persist) -> atom Effect로 처리
- [x] localStorage 로직을 모아서 커스텀 훅으로 처리 -> 응집성
- [x] isChecked 변수를 하나의 객체로 변경

- [x] updateCartItemQuantity, deleteCartItem - API 반환값 사용
- [x] self-closing tag 수정
- [x] handleHomeButtonClick 함수명을 navigateCartPage로 의도가 드러나도록 변경
- [x] VariantType 선언 위치 변경
- [x] atoms 테스트 명세를 구체적으로 변경
- [x] 전역 스타일 반영

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

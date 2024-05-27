# react-shopping-cart

## 컴포넌트

- 장바구니 (Cart)

  CartHeader, ProductList, ProductTotalPriceList을 가지는 컴포넌트

- 장바구니 헤더 (CartHeader)

  장바구니에 담긴 종류의 갯수 출력

- 상품 리스트 (ProductList)

  장바구니에 담은 모든 상품의 리스트

- 상품 아이템 (ProductItem)

  하나의 상품에 대한 상품 이미지, 이름, 가격, 수량

- 상품 가격 목록 및 총 결제 금액 (ProductTotalPriceList)

  주문 금액, 배송비, 총 결제 금액

- 헤더 (Header)

- 버튼 (Button)

  삭제 버튼, +/- 버튼

- 체크박스 (CheckBox)

- 플로팅 버튼 (FloatingButton)

  주문확인, 결제하기 버튼 (활성화/ 비화성화)

- 에러 메세지 (ErrorFallback)

- 주문 확인 장바구니 (OrderConfirmCart)

  - 장바구니 페이지에서 선택한 상품 목록들을 보여줌

- 모달 (CouponModal)
  - 실시간으로 적용 가능한 쿠폰 목록 버튼을 활성화한다.

## 페이지

- 장바구니 페이지 (CartPage)

  - 장바구니에 상품이 존재할 때
    - ProductList 컴포넌트 출력
    - FloatingButton 활성화
  - 장바구니에 상품이 존재하지 않을 때
    - EmptyCart 컴포너틑 출력
    - FloatingButton 비활성화

- 주문 확인 페이지 (OrderConfirmPage)

  - 구매 종류, 상품 갯수, 총 결제 금액 출력
  - FloatingButton 활성화
    - 클릭 시 결제 확인 페이지로 이동
  - 선택한 상품 목록
  - "쿠폰 적용" 버튼 클릭 시 쿠폰 모달 띄우기
    - coupons api 호출해서 쿠폰 목록 불러오기
  - 뒤로가기 버튼 클릭 시, 직전 페이지로 이동
  - 사용자가 선택한 쿠폰을 적용한 뒤, 주문 금액, 쿠폰 할인 금액, 배송비, 총 결제 금액 계산
  - "결제하기" 버튼 클릭 시 결제 확인 페이지로 이동

- 결제 확인 페이지 (PaymentConfirmPage)

  - 구매 종류, 상품 갯수, 총 결제 금액 출력
  - FloatingButton 활성화
    - 클릭 시 장바구니 페이지로 이동
    - orders api 호출

## 기능

- /cart-items API를 호출하여 장바구니 상품 데이터를 불러오기
- 불러온 데이터를 기반으로 Recoil을 사용하여 클라이언트 상태를 관리
- 개별 상품의 선택 여부, 결제 금액, 배송비 등의 상태를 Recoil로 관리
- 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리
- 상품 선택/해제 시 결제 금액을 동적으로 변경
- 결제 금액이 10만원 이상일 경우 배송비는 무료
- 장바구니 상품 수량 변경
- 장바구니 상품 제거
- 새로고침 시, 선택한 상품 상태 유지 (localStorage)
- /coupons API를 호출하여 쿠폰 목록을 불러온다.
- 쿠폰 적용 결과를 계산하여 반환한다.

### Recoil

- 장바구니 상품의 다양한 상태를 Atom으로 관리
- 결제 금액, 배송비 등의 파생 상태를 Selector를 통해 계산

### API

- /cart-items API를 호출하여 장바구니 데이터를 불러오기

### localStorage

- 장바구니의 상태를 스토리지에 저장하여 새로고침 시에도 유지

## Test

RTL을 사용하여 주요 기능에 대한 테스트 케이스를 작성  
mock 데이터를 생성하여 atom과 selector 테스트

### atom

- cartData

  - mock API를 호출하여 장바구니 데이터 불러오기
  - 장바구니에 특정 cartItem을 제거한 상태를 정상적으로 업데이트

- cartQuantity

  장바구니에 담긴 총 주문 수량 불러오기

- cartItemQuantityState

  개별 cartItem의 수량을 변경하면, 변경된 값을 정상적으로 업데이트

- cartItemCheckState

  초기 값이 false인지 확인

- couponList
  /coupons API 호출 결과를 초기값으로 설정

- specialZoneCheckState
  제주도 및 도서 산간 지역 상태 관리

- couponDiscountAmount
  쿠폰 적용한 할인 금액

### selector

- allCartItemsCheckState

  한번에 모든 cartItem checkbox 선택

- checkedCartItems

  선택된 cartItem만 반환

- calculateOrderPrice

  선택한 상품 금액 계산, 배송비 계산, 총 결제 금액 계산

### Test

RTL을 사용하여 주요 기능에 대한 테스트 케이스를 작성

- 장바구니 데이터 로딩: /cart-items API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러오는지 테스트한다.
- 상품 선택 기능: 개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경되는지 테스트한다.
- 결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.
- 배송비 계산: 결제 금액에 따라 배송비가 정상적으로 계산되는지 (10만원 이상 무료) 테스트한다.
- 수량 변경 기능: 상품의 수량을 변경할 때 올바르게 반영되는지 테스트한다.
- 상품 제거 기능: 장바구니에서 상품을 제거할 때 정상적으로 동작하는지 테스트한다.

### 상태 관리

| 상태 종류  | 상태 이름              | 설명                                            |
| ---------- | ---------------------- | ----------------------------------------------- |
| Atom       | cartData               | 장바구니(cart) 아이템 목록                      |
| Atom       | cartQuantity           | 장바구니 아이템 총 수량                         |
| Atom       | couponList             | 쿠폰 목록                                       |
| Atom       | specialZoneCheckState  | 제주도 및 도서 산간 지역 체크박스 활성화 여부   |
| Atom       | checkedCouponsState    | 선택된 쿠폰들의 목록                            |
| Atom       | couponDiscountAmount   | 쿠폰으로 적용된 할인 금액                       |
| AtomFamily | cartItemQuantityState  | 각 아이템의 수량                                |
| AtomFamily | cartItemCheckState     | 각 아이템의 체크박스 활성화 여부                |
| Selector   | allCartItemsCheckState | 전체 선택 체크박스 활성화/비활성화              |
| Selector   | checkedCartItems       | 체크된 아이템 목록                              |
| Selector   | calculateOrderPrice    | 체크된 아이템의 상품 금액, 배송비, 총 결제 금액 |

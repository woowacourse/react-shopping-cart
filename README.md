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

## 페이지

- 장바구니 페이지 (CartPage)

  - 장바구니에 상품이 존재할 때
    - ProductList 컴포넌트 출력
    - FloatingButton 활성화
  - 장바구니에 상품이 존재하지 않을 때
    - Empty 컴포너틑 출력
    - FloatingButton 비활성화

- 주문 확인 페이지 (PaymentConfirmPage)

  - 구매 종류, 상품 갯수, 총 결제 금액 출력
  - FloatingButton 비활성화
  - 뒤로가기 버튼 클릭 시, 직전 페이지로 이동

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

### selector

- allCartItemsCheckState

  한번에 모든 cartItem checkbox 선택

- checkedCartItems

  선택된 cartItem만 반환

- calculateOrderPrice

  선택한 상품 금액 계산, 배송비 계산, 총 결제 금액 계산

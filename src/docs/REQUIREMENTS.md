## 기능 요구 사항

> API와 Recoil을 활용하여 장바구니 상품 데이터를 관리한다.

### 장바구니 기능 구현

- [x] API 활용한 장바구니 관리 구현

  - [x] `GET /cart-items` API로 장바구니 상품 데이터를 불러올 수 있다.
    - [x] 상품 데이터에는 상품ID, 상품명, 가격, 상품 이미지 URL, 카테고리가 포함된다.
  - [x] `PATCH /cart-items/{id}` API로 장바구니의 해당 상품 수량을 변경할 수 있다.
  - [x] `DELETE /cart-items/{id}` API로 장바구니에서 해당 상품을 삭제할 수 있다.

- [x] localStorage를 활용한 상품별 체크 상태 관리

  - [x] 장바구니 상품 데이터를 불러올 때, localStorage
  - [x] 장바구니로 로드된 상품별 체크 상태를 저장한다.

- [x] Recoil을 이용한 상태 관리

  - [x] cartItemsState: 장바구니에 있는 상품 목록을 관리하는 Atom
  - [x] itemQuantityState: 상품에 대한 주문 수량을 관리하는 AtomFamily
  - [x] isCheckedItemIdsState: 장바구니에서 체크된 상품들의 ID를 관리하는 Atom
  - [x] orderAmountState: 장바구니에서 체크된 상품들의 합산 금액을 관리하는 Selector
  - [x] hasCheckedItemsState: 장바구니에서 체크된 상품이 있는지 확인하는 Selector
  - [x] deliveryFeeState: 배송비를 관리하는 Selector
  - [x] totalAmountState: 장바구니에서 체크된 상품들의 총 주문 금액을 관리하는 Selector

## 페이지 구성

- [x] 헤더
- [x] 장바구니
  - [x] 타이틀 & 디스크립션
  - [x] 상품목록
    - [x] 개별 상품 컨테이너
  - [x] 총 결제 금액
- [ ] 버튼

## 기능 요구 사항

> API와 Recoil을 활용하여 장바구니 상품 데이터를 관리한다.

### 장바구니 기능 구현

- [x] API 활용한 장바구니 관리 구현

  - [x] `GET /cart-items` API로 장바구니 상품 데이터를 불러올 수 있다.
    - [x] 상품 데이터에는 상품ID, 상품명, 가격, 상품 이미지 URL, 카테고리가 포함된다.
  - [x] `PATCH /cart-items/{id}` API로 장바구니의 해당 상품 수량을 변경할 수 있다.
  - [x] `DELETE /cart-items/{id}` API로 장바구니에서 해당 상품을 삭제할 수 있다.

- [x] localStorage를 활용한 상품별 체크 상태 관리

  - [x] 장바구니 상품 데이터를 불러올 때, localStorage
  - [x] 장바구니로 로드된 상품별 체크 상태를 저장한다.

- [x] Recoil을 이용한 상태 관리

  - [x] cartItemsState: 장바구니에 있는 상품 목록을 관리하는 Atom
  - [x] itemQuantityState: 상품에 대한 주문 수량을 관리하는 AtomFamily
  - [x] isCheckedItemIdsState: 장바구니에서 체크된 상품들의 ID를 관리하는 Atom
  - [x] orderAmountState: 장바구니에서 체크된 상품들의 합산 금액을 관리하는 Selector
  - [x] hasCheckedItemsState: 장바구니에서 체크된 상품이 있는지 확인하는 Selector
  - [x] deliveryFeeState: 배송비를 관리하는 Selector
  - [x] totalAmountState: 장바구니에서 체크된 상품들의 총 주문 금액을 관리하는 Selector

## 페이지 구성

- [x] 헤더
- [x] 장바구니
  - [x] 타이틀 & 디스크립션
  - [x] 상품목록
    - [x] 개별 상품 컨테이너
  - [x] 총 결제 금액
- [x] 결제 버튼
- [x] 결제 버튼

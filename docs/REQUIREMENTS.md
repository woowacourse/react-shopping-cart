## API 호출

- [x] get `/cart-items`
- [x] patch `/cart-items/{id}`

## type

- 하나의 장바구니 아이템은 어떤 정보로 구성되어야 하는가?
  - id
  - quantity
  - product
    - id
    - name
    - price
    - imageUrl
    - category
  - isSelected

## Atoms

- [x] cartItemQuantity - 장바구니 아이템 별 수량을 관리하는 atomFamily
- [x] cartItemSelected - 장바구니 아이템의 포함 여부를 관리하는 atomFamily

## Selector(Recoil)

- [x] cartList - 전체 장바구니 리스트를 api 호출을 통해 가져옴
- [x] totalPrice - 전체 아이템 총 주문금액
- [x] shippingFee - 배송비(10만원 이상인 경우 무료)
- [x] cartItemAllSelected - 결제 항목 전체 선택 여부

## 장바구니 계산

- [x] 수량 추가
- [x] 수량 감소
- [ ] 아이템 삭제
- [x] 전체 선택
- [x] 전체 선택 해제

## Storage 관리

- id(장바구니에서 몇번째인지)
- quantity
- product
  - id
  - name
  - price
  - imageUrl
  - category
- 선택 여부(프론트엔드)

## test

- [x] 장바구니 데이터 로딩: /cart-items API 호출을 모킹해 장바구니 데이터를 정상적으로 저장하는지 테스트한다.
- [x] 결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트한다.
- [x] 배송비 계산: 결제 금액에 따라 배송비가 정상적으로 계산되는지 (10만원 이상 무료) 테스트한다.
- [x] 상품 선택 기능: 개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경되는지 테스트한다.
- [x] 수량 변경 기능: 상품의 수량을 변경할 때 올바르게 반영되는지 테스트한다.

## 페이지

- 장바구니 페이지
- 주문 확인 페이지
  - 종류
  - 총 수량
  - 총 결제 금액

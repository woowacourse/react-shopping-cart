# 1. 핵심 한 줄 정의

사용자의 장바구니 상품 목록 및 예상 결제 금액을 확인하고, 결제 단계로 전환한다.

# 2. 사용자 관점에서 기능 리스팅 (세부 기능 정의)

- [ ] CartItem
  - [ ] 장바구니 상품 정보를 보여준다
  - [ ] 장바구니 상품을 선택/해제한다.
  - [ ] 장바구니 상품을 제거한다.
  - [ ] 장바구니 상품 수량을 변경한다.
- [ ] CartItemList
  - [ ] 장바구니 상품 목록을 보여준다.
  - [ ] 전체 선택
- [ ] CartAmount
  - [ ] 주문금액, 배송비, 총 결제 금액을 보여준다.
- [ ] ShopHeader
  - [ ] SHOP을 보여준다
- [ ] BackHeader
  - [ ] 뒤로가기 아이콘 클릭 시 뒤로간다.
  - [ ] 뒤로가기 아이콘을 보여준다.
- [ ] OrderConfirmButton (button 기본 요소를 활용)
  - [ ] 주문확인 버톤을 클릭하면 주문확인 페이지로 이동한다.
- [ ] BuyButton (button 기본 요소를 활용)
  - [ ] disabled 처리가 되어 있다.
- [ ] OrderSummary
  - [ ] 총결제금액을 보여준다.
  - [ ] 장바구니 상품 종류, 장바구니 상품 개수를 보여준다.

# 3. 구현을 어떻게 할지 리스팅

- [ ] 상태

  - atom

    - [ ] 장바구니 상품 배열

      - [ ] key: 'cartItems'
      - [ ] returnType: CartItem[]

    - [ ] 선택여부 배열

      - [ ] key: selectedCartItemIds
      - [ ] returnType: number[]

  - selector

    - [ ] 장바구니 상품 배열(그런데 선택 여부가 더해진)

      - [ ] key: cartItemsWithIsSelected
      - [ ] returnType: CartItemWithIsSelected[]
      - dependency: cartItems, selectedCartItemIds

    - [ ] 주문 금액

      - [ ] key: orderAmount
      - [ ] returnType: number
      - dependency: cartItemsWithIsSelected

    - [ ] 배송비

      - [ ] key: deliveryCost
      - [ ] returnType: number
      - dependency: orderAmount

    - [ ] 총 결제 금액

      - [ ] key: totalOrderAmount
      - [ ] returnType: number
      - dependency: deliveryCost, orderAmount

    - [ ] ~~장바구니 상품 종류 수~~

      - [ ] ~~key: uniqueCartItemsCount~~
      - [ ] ~~returnType: number~~
      - ~~dependency: cartItems~~

    - [ ] ~~선택된 장바구니 상품 종류 수~~

      - [ ] ~~key: selectedUniqueCartItemsCount~~
      - [ ] ~~returnType: number~~
      - ~~dependency: selectedCartItemIds~~

    - [ ] 선택된 총 장바구니 상품 개수

      - [ ] key: selectedCartItemsCount
      - [ ] returnType: number
      - dependency: cartItemsWithIsSelected

- [ ] api

  - [ ] cartItems get
  - [ ] cartItems/[id] patch
  - [ ] cartItems/[id] delete

- [ ] UI

  - [ ] CartItem
    - [ ] prop: cartItem
  - [ ] CartItemList
  - [ ] CartAmount
  - [ ] Header
    - [ ] prop: hasBackButton, text
    - [ ] shop header: `text = shop`
    - [ ] back header: `hasBackButton = true`
  - [ ] Button
    - [ ] prop: text, onclick, disabled
  - [ ] OrderSummary

- [ ] 스토리지
  - 세션 스토리지 활용
  - 관리 대상: 장바구니 상품 선택여부
    - 데이터 구조: `number[]`

# 4. 구현 순서

1. CartList

- [x] atom 정의 (cartItemsState, selectedCartItemIds)
- [x] selector 정의 (cartItemsWithIsSelected)
- [x] 장바구니 상품 목록 불러오기 (api fetching)
- [x] CartItem
  - [x] cartItems/[id] patch (개수 수정)
  - [x] cartItems/[id] delete (장바구니 상품 삭제)
  - [x] UI 구현(prop: cartItem)
- [x] empty case 대응
- [x] atom & select 세부 구현(api, session storage 연결) & 적용
- [x] 전체 선택 기능 구현

1. CartAmount

- [x] selector 정의 (orderAmount, deliveryCost, totalOrderAmount)
- [x] UI 구현

3. CartTitle

- [x] ~~selector 정의 (uniqueCartItemsCount)~~
- [x] UI 구현

1. Header, Footer

2. OrderSummary

- [x] selector 정의 (~~selectedUniqueCartItemsCount~~, selectedCartItemsCount, totalOrderAmount)
- [x] UI 구현

1. UX 최적화

- [x] ErrorBoundary, Suspense

### test

1. CartList

- rawCartItemsState
  - [x] 초기값이 잘 세팅되는지
- selectedCartItemIdsState
  - [x] 초기값이 잘 세팅되는지
  - [x] set이 발생할 때 putInSelectedCartItemIds이 호출되는지
- useCartItemControl
  - [x] remove (1. delete api 요청 2. 상태 변경)
  - [x] updateQuantity (1. patch api 요청 2. 상태 변경)
  - [x] toggleSelection (상태 변경)

### 남은거

- [x] useCartItemControl 테스트
- [x] OrderSummary 컴포넌트 개발 및 라우트 처리
- [x] ErrorBoundary

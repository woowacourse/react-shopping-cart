# react-shopping-cart

# 최소 기능 목록

- [ ] **`/cart-items`** API를 호출하여 장바구니 상품 데이터를 불러온다.
  - [ ] UI 컴포넌트 : ShoppingCartPage
  - [ ] API : cartAPI (get, delete, patch, post) ← API Provider 로 구현
  - [ ] 서버의 카트 데이터로 장바구니 목록이 렌더링된다.
- [ ] 불러온 데이터를 기반으로 클라이언트 상태를 구성하고 관리한다.
  - API Provider 의 상태에 따라 개별 상품의 선택 여부, 결제 금액, 배송비 등의 상태를 관리한다.
- [ ] 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
- 진입 시, 전체 선택 되어 있는 것이 디폴트이다.
  → checkedItem 배열을 초기화, 장바구니에 있는 id를 저장
- 상품 선택/해제 시 결제 금액을 동적으로 변경한다.
  → orderPrice: checkedItem 배열에 있는 id를 가진 cartItem의 price와 quantity를 통해 변경
- 결제 금액이 10만원 이상일 경우 배송비는 무료이다.
  → orderPrice가 10만원이 넘으면 무료, 아니면 3000
- [ ] 장바구니 상품의 수량을 변경할 수 있다.
- [ ] 장바구니에 담긴 상품을 제거할 수 있다.

# UI 컴포넌트

- [ ] ShoppingCartPage.tsx (Header, CartLayout, OrderConfirmButton)
- [ ] Header <Logo>
- [ ] CartLayout.tsx (CartTitle, CartCheckList, CartPrice)
- [ ] CartTitle → TitleText, CartCountTitle
- [ ] CartCheckList → CartItem(Checkbox(common), Button(common), Counter(common)로 만들어진 CartCounter(feature), PreviewImage)[]
  - [ ] CartCheckList 가 관리하는 상태 → fetch한 cartList, [{cartId: boolean(checked)}]
  - [ ] CartItem 에 있는 CartCounter는 CartAPI 요청을 함께 처리하는 feature component
- [ ] CartPrice → props{orderPrice} → CartNotice, CartPriceRow[]
- [ ] OrderConfirmButton
  - [ ] 최종 CartCheckList의 cartId 들을 POST

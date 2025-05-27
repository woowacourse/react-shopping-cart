# 🚀 장바구니

# 📍 학습 목표

✔️ 클라이언트 상태를 효과적으로 모델링하고 관리할 수 있다.
✔️ Jest, React Testing Library(RTL)를 활용하여 주요 기능에 대한 테스트를 작성할 수 있다.

# 🎯 기능 요구 사항

- [ ] **`/cart-items`** API를 호출하여 장바구니 상품 데이터를 불러온다.

- [ ] 불러온 데이터를 기반으로 클라이언트 상태를 구성하고 관리한다.

  - [ ] 개별 상품의 선택 여부를 받을 수 있다.
  - [ ] 상품 전체 결제 금액을 나타낼 수 있다.
  - [ ] 배송비를 나타낼 수 있다.
    - [ ] 결제 금액이 10만원 이상일 경우 배송비는 무료이다.
  - [ ] 최종 금액을 나타낼 수 있다.
  - [ ] 상품 선택/해제 할 수 있다.
    - [ ] 선택 시 결제 금액을 동적으로 변경한다.

- [ ] 장바구니 상품의 수량을 변경할 수 있다.
- [ ] 장바구니에 담긴 상품을 제거할 수 있다.

# 컴포넌트

- [ ] Header
- [ ] ConfirmButton
- [ ] TextButton
- [ ] QuantityStepper
  - [ ] StepperButton
- [ ] Text
- [ ] ToggleButton
- [ ] PriceRow
- [ ] CartItemCard
- [ ] CartItemsList

# ✅ 프로그래밍 요구사항

> 이전 미션의 프로그래밍 요구사항은 기본으로 포함한다.

### State Management

- React의 상태 관리 훅(useState, useReducer)을 사용하여 상태를 구성하고, 필요 시에 Context API 등을 활용해 해당 상태가 필요한 컴포넌트 트리에 상태를 전달합니다.
- 결제 금액, 배송비 등의 파생 상태(Derived State)를 동적으로 계산한다.

### Test

- Jest, React Testing Library를 사용하여 주요 기능에 대한 테스트 케이스를 작성한다.
- 주요 기능을 명확히 정의하고, 그것을 어떻게 테스트할 지 스스로 판단한다.

### Library

- 스타일링에는 CSS Module, styled-components, emotion 중 한 가지를 선택하여 사용한다.

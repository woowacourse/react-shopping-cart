## STEP1 기능 구현 목록

- 장바구니 API 연동
  - [x] 장바구니 목록 조회
  - [x] 장바구니 아이템 추가
  - [x] 장바구니 아이템 수량 조회
  - [x] 장바구니 아이템 수량 변경
  - [x] 장바구니 아이템 삭제
- Recoil로 장바구니 상태 관리
  - [x] 상품 목록 조회
  - [x] 상품 종류 수량
  - [x] 개별 상품의 수량
  - [x] 개별 상품 삭제
  - [x] 개별 상품의 선택 여부
  - [x] 전체 상품의 선택 여부
  - [ ] 주문 금액
  - [ ] 배송비
  - [ ] 총 결제 금액
- Storage
  - [ ] 장바구니의 상태를 스토리지에 저장
  - [ ] 스토리지에서 장바구니 상태를 불러오기
  - [ ] 새로고침 시에도 장바구니 상태 유지
- UI 컴포넌트 작업
  - [x] Header
  - [x] CartHeader
  - [x] CartItemCardList
  - [x] CartItemCard
  - [x] CartSummary
    - [x] CartSummaryItem
  - [x] HeaderButton
  - [x] ConfirmButton
  - [x] ActionButton
    - [x] CheckButton
    - [x] Plus/Minus Button
    - [x] Select Button
- UI 페이지 작업
  - [x] CartPage
  - [x] OrderConfirmationPage
  - [x] 라우터
- Storybook
  - [ ]
- RTL
  - [ ] 장바구니 데이터 로딩: API 호출을 통해 초기 장바구니 데이터를 정상적으로 불러오는지 테스트
  - [ ] 상품 선택 기능: 개별 상품의 선택/해제 시 선택 여부가 정상적으로 변경되는지 테스트
  - [ ] 결제 금액 계산: 선택된 상품들의 가격 합계가 결제 금액으로 정상 반영되는지 테스트
  - [ ] 배송비 계산: 결제 금액에 따라 배송비가 정상적으로 계산되는지 (10만원 이상 무료) 테스트
  - [ ] 수량 변경 기능: 상품의 수량을 변경할 때 올바르게 반영되는지 테스트
  - [ ] 상품 제거 기능: 장바구니에서 상품을 제거할 때 정상적으로 동작하는지 테스트

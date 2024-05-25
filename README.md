## 📍 step.1 학습 목표
- Recoil을 사용하여 클라이언트 상태를 관리할 수 있다.
- React Testing Library(RTL)를 활용하여 주요 기능에 대한 테스트를 작성할 수 있다.

## 📍 step.2 학습 목표
- 복잡한 '파생' 상태 관리
- RTL 테스트 고도화

## 기능 요구사항
- [x] /cart-items API를 호출하여 장바구니 상품 데이터를 불러올 수 있다.
- [x] 불러온 데이터를 기반으로 Recoil을 사용하여 클라이언트 상태를 관리한다.
    - [x] 주문 금액
    - [ ] 할인 금액
    - [x] 배송비
        - [x] 쿠폰 적용 후의 최종 결제 금액과 관계 없이, ‘총 주문 금액’이 100,000원 이상일 경우 무료 배송 혜택이 적용된다.
        - [x] '배송지가 제주도 및 도서 산간 지역입니까?'라는 체크박스에 체크를 했다면, 배송비를 3천원 추가한다.
    - [x] 결제 금액
    - [x] 상품 수량
    - [x] 상품 선택 여부
- [x] 장바구니 상품의 수량 변경을 할 수 있다.
- [x] 장바구니에 담긴 상품을 제거할 수 있다.

- [x] 상품 선택에 따라 동적인 변경 사항을 처리할 수 있다.
    - [x] 주문 금액
    - [x] 할인 금액
    - [x] 배송비
    - [x] 결제 금액

- [x] 쿠폰
    - [x] 유효기간이 지난 경우 선택할 수 없다.
    - [x] 조건을 충족하지 않는 경우 선택할 수 없다.
        - [x] 유효기간이 만료된 경우
        - [x] 최소 주문 금액을 넘지 못한 경우
        - [x] 배송비 쿠폰의 경우 배송비가 무료인 경우
        - [x] 사용 가능 시간이 아닌 경우
        - [x] 2+1 쿠폰의 경우 장바구니에 동일한 제품 3개를 담지 않은 경우
        - [x] 이미 2개를 선택한 경우
    - [x] 2개 쿠폰을 사용하는 경우 최종 금액은 할인 금액이 더 큰 값을 기준으로 계산하여 보여준다.

- [x] 새로고침해도 선택한 상품 상태를 유지해서 보여준다.

- [x] 하단 버튼 클릭시 페이지를 이동할 수 있다.
    - [x] 주문 확인 버튼 클릭시 주문 확인 페이지로 이동할 수 있다.
    - [x] 결제하기 버튼 클릭시 결제 확인 페이지로 이동할 수 있다.
    - [x] 장바구니로 돌아가기 버튼 클릭시 장바구니 페이지로 이동할 수 있다.

- [ ] 결제하기
    - [ ] '결제하기' 버튼을 누를 때 /orders api를 이용하여 주문 생성을 할 수 있다.
    - [ ] 결제 확인 후 다시 장바구니로 돌아오면 장바구니에서 주문한 상품은 사라져야 한다.
    - [ ] 장바구니로 돌아왔을 때 모든 선택 상태는 초기화 해야 한다.
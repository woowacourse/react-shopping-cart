# react-shopping-cart

## 설계 방향

1. 페이지 라우팅 x (싱글페이지)
2. 주문확인 페이지에서 새로고침시, 장바구니 페이지로 이동 (하나의 로직이기 때문에, 결제창 x)
3. 상태 -> 가공한다. (isChecked를 get으로 받아온 데이터와 조합)

## 기능 명세서

- [x] prettier 설정
- [x] emotion 설정 (css/react/styled)

- [x] msw 초기세팅 (mock 데이터 -> 장바구니 데이터[ 2~3개 ])

  - [x] get / 장바구니 조회
  - [x] patch / 장바구니 내부 품목 수량 조절
  - [x] delete / 장바구니 내부 품목 삭제
  - [x] cart-items mock 데이터 추가

- [x] api 세팅

  - [x] get / 장바구니 조회
  - [x] patch / 장바구니 내부 품목 수량 조절
  - [x] delete / 장바구니 내부 품목 삭제

- [ ] ui 퍼블리싱

  - [x] Header 컴포넌트
  - [ ] CartPage 컴포넌트 -> useCart() -> fetch get -> 데이터를 context / data -> state 가공하는 함수들이
  - const money = state.filter (check) / const boundary = 1000000원 -> 훅에서 관리
  - [ ] 컴포넌트 => 배송비 10만원 저장 -> 바꿔주고, 50000원 컴포넌트 탐색을 내부에서 x
    - [x] Text 컴포넌트 -> variant=title / variant = description-1 -> title -> children 장바구니
    - [x] CheckBox 컴포넌트 (props -> isCheck, onClick, children)
    - [ ] CartList 컴포넌트 (props cart get state)
      - [ ] 전체를 체크 박스
      - [x] 반복문)CartItem - 조합
    - [ ] 금액들 모아놓는 컴포넌트 -> priceComponent 조합 (children) 주문금액 컴포넌트 / 배송비 / 총 결제 금액
      - [ ] description text
      - [ ] 주문금액
      - [ ] 배송비
      - [ ] 총결제 금액
    - [x] 버튼 (버튼 true/false -> useCart() -> state.filter (check))
    - [x] 수량 조절기 컴포넌트

1. 페이지 라우팅을 안할시
   1. 상위에서 현재 페이지가 어떤 곳에서 속해있는지 상태를 가지고 있어여한다.
2. 페이지를 라우팅 할시
   1. 상위에서 상태 x
   2. 버튼 눌렀을 때, 페이지 라우팅 액션
   3. 새로고침시, 상태가 초기화된다. -> 로컬 스토리지를 이용해서 현재 데이터 값을 저장을 해놔야한다. (그리고 재요청)
      1. 값이 없으면 다시 페이지 리턴
   4. 새로고침x -> 페이지 간의 상태가 공유되어야하기 때문에, 쿼리스트링 / 로컬스토리지 / provider 데이터 전달

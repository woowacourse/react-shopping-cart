# react-shopping-cart

## 설계 방향

1. 페이지 라우팅 x (싱글페이지)
2. 주문확인 페이지에서 새로고침시, 장바구니 페이지로 이동 (하나의 로직이기 때문에, 결제창 x)
3. 상태 -> 가공한다. (isChecked를 get으로 받아온 데이터와 조합)

- 1. 가공을 했을 경우 => {id:1, quantity:1, isChecked:false}
- 2. 가공을 안 하고 상태로 만들 경우 => id[1,2,3,4]

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
  - [x] CartPage 컴포넌트 -> useCart() -> fetch get -> 데이터를 context / data -> state 가공하는 함수들이
  - const money = state.filter (check) / const boundary = 1000000원 -> 훅에서 관리
  - [x] 컴포넌트 => 배송비 10만원 저장 -> 바꿔주고, 50000원 컴포넌트 탐색을 내부에서 x
  - [x] useCart 훅 구현 (api 요청, 이벤트 핸들러, 파생값 계산, 타입 지정)
    - [x] Text 컴포넌트 -> variant=title / variant = description-1 -> title -> children 장바구니
    - [x] CheckBox 컴포넌트 (props -> isCheck, onClick, children)
    - [x] CartList 컴포넌트 (props cart get state)
      - [x] 전체를 체크 박스
      - [x] 반복문)CartItem - 조합
    - [x] 금액들 모아놓는 컴포넌트 -> priceComponent 조합 (children) 주문금액 컴포넌트 / 배송비 / 총 결제 금액
      - [x] description text
      - [x] 주문금액
      - [x] 배송비
      - [x] 총결제 금액
    - [x] 버튼 (버튼 true/false -> useCart() -> state.filter (check))
    - [x] 수량 조절기 컴포넌트
    - [x] 장바구니 없는 페이지
    - [x] confirm 페이지

1. 페이지 라우팅을 안할시
   1. 상위에서 현재 페이지가 어떤 곳에서 속해있는지 상태를 가지고 있어여한다.
2. 페이지를 라우팅 할시
   1. 상위에서 상태 x
   2. 버튼 눌렀을 때, 페이지 라우팅 액션
   3. 새로고침시, 상태가 초기화된다. -> 로컬 스토리지를 이용해서 현재 데이터 값을 저장을 해놔야한다. (그리고 재요청)
      1. 값이 없으면 다시 페이지 리턴
   4. 새로고침x -> 페이지 간의 상태가 공유되어야하기 때문에, 쿼리스트링 / 로컬스토리지 / provider 데이터 전달


### 리팩토링 수정사항

- [x] 에러 ui 추가
- [x] 에러 context 추가
- [x] 1에서 수량 차감시 아이템 사라지기 막기 -> 1일 때 차감 버튼 비활성화
- [x] apiClient params falsy값 수정
- [x] header 컴포넌트 합성 컴포넌트 방식으로 수정 -> 각페이지에서 관리
- [x] Button 컴포넌트 props 네이밍 변경 (styles X)
- [x] cartItem type 명 변경
- [x] orderConfirmPage location.state 처리
- [ ] useCart 훅 return 값 useMemo 처리하기
- [x] useCart 훅 비동기 처리 로직 -> 에러 추가


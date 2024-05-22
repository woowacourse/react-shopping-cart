# react-shopping-cart

### 🎯 step 1 기능 요구 사항

#### API

- [x] 장바구니 상품 데이터 (GET)
- [x] 장바구니 상품 삭제 (DELETE)
- [x] 장바구니 상품 수량 변경 (PATCH)
- [x] 장바구니 상품 전체 수량 개수 (GET)

#### UI & COMPONENT

- [x] Header
- [x] 장바구니 전체 수량 BOX
  - [x] 장바구니 멘트
  - [x] 총 장바구니 수량
    - [x] (API 연동)
- [x] 전체 상품 리스트
  - [x] (API 연동)
  - [x] 전체 체크 박스
  - [x] 상품 카드
    - [x] 카드 체크 박스
    - [x] 상품 삭제 버튼
      - [x] (API 연동)
    - [x] 상품 사진
    - [x] 상품 정보
    - [x] 상품 수량 변경 (+/-)
      - [x] (API 연동)
- [x] 주문 확인서
  - [x] 무료 배달 멘트
  - [x] 주문 금액
  - [x] 배송비
  - [x] 총 결제 금액
- [x] 주문 확인 버튼 (주문 없을시 disable 처리)
  - [x] -> 클릭시 주문 확인 화면으로 이동
- [x] 주문 없을 시 안내 문구

- [x] 주문 확인 화면
- [x] 구매 상품 수량 정보 멘트
- [x] 총 결제 금액 멘트
- [x] 결제하기 버튼 (disable 상태)

### 🎯 step 2 기능 요구 사항

- [ ] 복잡한 파생 상태를 고려
  - [x] 쿠폰 목록 가져오기
  - [ ] 필터링으로 적용 가능한 쿠폰 목록만 보여주기
    - [x] 유효성 확인 (존재 여부, 만료일 체크)
      - [x] 쿠폰, 현재 날짜 -> 가능 여부
    - [x] 적용 가능 조건 확인 (최소 주문 금액, 최소 주문 수량, 사용 가능 시간)
      - [x] 쿠폰, 현재 가격, 현 시간 -> 가능 여부
  - [ ] 할인된 가격 보여주기
    - [ ] 현재 가격, 쿠폰 전달 -> 할인된 가격
- [ ] 쿠폰 복수 할인
  - [ ] 쿠폰은 한 번에 최대 2개를 사용 가능
    - [ ] 2개 이상 클릭 시 다른 쿠폰 disable 시키기 (UI)
  - [ ] 2개 쿠폰을 사용하는 경우 최종 금액이 할인 금액이 더 큰 값을 기준으로 계산하여 보여줌
    - [ ] 쿠폰 2개일 때
      - [ ] 각각 할인된 가격을 받아와서 두가지 경우 금액을 판별
        - [ ] e.g. ) 30% + 5000원 vs 5000원 + 30%
        - [ ] 더 금액이 큰 걸 return
    - [ ] 쿠폰 1개일 때
      - [ ] 할인된 가격 바로 return
- [ ] 배송비
  - [ ] 쿠폰 적용 후의 최종 결제 금액과 관계 없다. 상품 가격만 생각
  - [ ] ‘총 주문 금액’이 100,000원 이상일 경우 무료 배송 혜택이 적용
  - [ ] '배송지가 제주도 및 도서 산간 지역입니까?'라는 체크박스에 체크시, 배송비를 3천원 추가

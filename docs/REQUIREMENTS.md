# 컴포넌트 & 기능 요구사항

- [x] 주요 컴포넌트

  - [x] ShoppingTitle
    - [x] 장바구니 메인 타이틀이 있다.
  - [x] ShoppingCardList
    - [x] 총 상품 수량을 확인할 수 있다.
    - [x] 장바구니 물품들을 확인할 수 있다.
  - [x] ShoppingCard
    - [x] 장바구니에 담긴 물품을 보여준다.
  - [x] ShoppingPreview
    - [x] 결제 예상 금액을 보여준다.

- [x] 컴포넌트 재사용성 높이기

  - [x] 분리 & 구현
    - [x] ProductName
      - [x] ProductInfo와 ShoppingCard에서 재사용
    - [x] ProductPrice
      - [x] ProductInfo, ShoppingCard, ShoppingPreview에서 재사용
    - [x] IconButton
      - [x] ProductCard의 쇼핑 아이콘 버튼과 ShoppingCardList의 삭제 아이콘 버튼으로 재사용
  - [x] 재사용
    - [x] Counter
      - [x] 스타일 컴포넌트 theme 적용
    - [x] ProductImg
      - [x] 스타일 컴포넌트 theme 적용

# 프로그래밍 요구사항

Readability

- [ ] API 요청을 처리하는 공통 함수나 커스텀 훅을 작성하여 재사용 가능하게 만든다.
- [ ] 페이지간 공통 스타일이 있는 경우 재사용한다.

Reusability

- [ ]서버와의 통신을 담당하는 코드와 UI를 렌더링 하는 코드를 분리하여 관심사를 분리한다.
- [ ]에러 처리 로직을 명확하게 작성하여 코드의 가독성을 높인다.

Performance

- [ ]불필요한 상태 관리를 최소화하고, 상태 업데이트를 최적화한다.
- [ ]컴포넌트의 리렌더링을 최소화하기 위해 memoization을 적용한다.

# 필수 요구사항

1. 장바구니 페이지
   장바구니 페이지 마크업을 완성하고, 상품 목록 페이지와 함께 모바일 환경 대응
2. MSW를 활용한 API Mocking
   MSW를 활용하여 실제 서버와 연동될 수 있는 API Mocking을 구현
   단순한 Endpoint 변경으로 실제 API 사용이 가능하도록 작업
3. 테스트
   장바구니 페이지에서 다양한 사용자 인터렉션에 대한 테스트 케이스를 고민하고, 선택한 테스트 도구를 이용하여 검증
4. 사용자 경험
   새로고침 해도, 장바구니에 담은 상품 유지

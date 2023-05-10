# 컴포넌트 & 기능 요구사항

- [x] Header
  - [ ] 홈 버튼을 누르면 메인페이지로 이동한다.
- [x] CartTextButton
  - [x] 장바구니에 담긴 수량을 확인할 수 있다.
- [x] CartIconButton
  - [x] 클릭 시 QuantityInput으로 스위치된다.
  - [x] 클릭 시 CartTextButton의 수량이 올라간다.
- [x] ProductCard
  - [x] 상품 이미지, 상품명, 가격을 확인할 수 있다.
- [x] ProductCardList
  - [x] 12개의 상품을 확인할 수 있다.
- [x] QuantityInput
  - [x] 수량을 조절할 수 있다.
- [ ] LocalStorage 저장
  - [ ] 새로고침 해도 장바구니에 담긴 수량이 유지된다.

<br>

# 필수 요구사항

1. 상품 목록 페이지에 필요한 UI 마크업
   header의 숫자 표시를 통해 장바구니에 담긴 품목의 갯수 표시
2. 전역 상태 관리
   recoil을 사용하여 전역 상태 관리
3. mock 데이터 활용
   Mock 데이터를 활용하여 상품 데이터를 처리한다. 협업 미션을 고려하여 장바구니 API 예상 명세 참고
4. 테스트 도구 선정
   적합한 테스트 도구를 선택하여 사용하고, 중요한 테스트 케이스를 정의하여 테스트 진행

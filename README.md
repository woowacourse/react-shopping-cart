# Mission 3. Requirements

## 앱 구조 디자인

### App Page

- [ ] Header

### Cart Page

- [ ] PageTitle : 각 페이지 타이틀, 설명
- [ ] CartItemList : 장바구니 상품 목록
  - [ ] CheckboxButton : 전체선택 버튼
  - [ ] CartItem : 장바구니 상품
    - [ ] Img : 상품 이미지
    - [ ] Button : 버튼 스타일 1
      - [ ] CheckboxButton : 상품 선택 버튼
      - [ ] DeleteButton : 상품 삭제 버튼
      - [ ] ItemCounter : 상품 수량 증감
        - [ ] CountingButton : 상품 수량 증감 버튼
- [ ] OrderSummary : 선택 상품 주문 요약 요약
- [ ] FooterButton : 앱 하단 버틑 (주문확인, 결제하기)

### OrderConfirm Page

<br>
<hr>

## 컴포넌트 분리

<img width="654" alt="image" src="https://github.com/woowacourse/react-modules/assets/71641127/0f95b7c7-f599-4973-ab9e-eb90b53f75cf">

<br>
<hr>

## 상태관리

### Atoms

- [ ] 개별 상품의 선택 여부
- [ ] 개별 상품의 수량

### Selectors

- [ ] 결제 금액
- [ ] 배송비

### recoil-persist

Recoil 상태를 LocalStorage와 동기화 할 수 있는 라이브러리

<br>
<hr>

## 스타일 라이브러리

--> styled component
이유: 이미 package.json 에 깔려있기때문

<br>
<hr>

## API 명세

### get → /cart-items

### patch → /cart-items/[id]

### delete → /cart-items/[id]

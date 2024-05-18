# Mission 3. Requirements

## 앱 구조 디자인

### App Page

- [x] Header

### Cart Page

common

- [x] Button

  - [x] BasicButton
  - [x] CheckboxButton
  - [x] CountingButton
  - [x] RoundButton

- [x] FooterButton
- [x] Header
- [x] ItemCounter
- [x] PageTitle

Error

- [x] NetworkError

ShoppingCart

- [x] CartEmptyScreen
- [x] CartItem
- [x] CartItemList
- [x] OrderSummary

### OrderConfirm Page

<br>
<hr>

## 컴포넌트 분리

<img width="654" alt="image" src="https://github.com/woowacourse/react-modules/assets/71641127/0f95b7c7-f599-4973-ab9e-eb90b53f75cf">

<br>
<hr>

## 상태관리

### Atoms

- [x] 개별 상품의 선택 여부
- [x] 개별 상품의 수량

### Selectors

- [x] 결제 금액
- [x] 배송비

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

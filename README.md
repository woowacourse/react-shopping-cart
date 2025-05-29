# react-shopping-cart

## 페이지 구현

- [x] 전체 레이아웃

- [x] Header
  - [x] Logo
  - [x] BackButton
- [x] Body
  - [x] ShoppingCartPage
    - [x] Header
      - [x] Title
      - [x] Description
    - [x] ItemList
      - [x] Item
        - [x] CheckBox
        - [x] DeleteButton
        - [x] ItemInfo
    - [x] Receipt
      - [x] Description
      - [x] OrderPrice
      - [x] ShippingFee
      - [x] TotalPrice
  - [x] CompletedPage
    - [x] OrderInfo
- [x] Footer
  - [x] OrderCheckButton
  - [x] PayCheckButton

## 🎯 기능 요구 사항

- [x] /cart-items API를 호출하여 장바구니 상품 데이터를 불러온다.
  - [x] Context API 등을 활용해 해당 상태가 필요한 컴포넌트 트리에 상태를 전달.
  - [x] API 응답 여부에 따라 State(IsLoading, IsFetching, IsSuccess, IsFail) 관리
- [x] 불러온 데이터를 기반으로 클라이언트 상태를 구성하고 관리한다.
  - [x] 장바구니 상품 리스트 (원본)
  - [x] 선택된 상품 리스트 (파생)
  - [x] 체크박스 (원본)
  - [x] 선택된 상품 수량 (파생)
  - [x] 장바구니 상품 수량 (파생)
  - [x] 주문 금액 (파생)
  - [x] 배송비 (파생)
  - [x] 총 결제 금액 (파생)
  - [x] 빈 장바구니 (파생)
  - [x] 주문 확인 버튼 (파생)
  - [x] 주문 확인 페이지 (파생)
- [x] 상품 선택에 따른 결제 금액, 배송비 등의 동적인 변경 사항을 처리한다.
  - [x] 진입 시, 전체 선택 되어 있는 것이 디폴트이다.
  - [x] 상품 선택/해제 시 주문 금액과 결제 금액을 동적으로 변경한다.
  - [x] 결제 금액이 10만원 이상일 경우 배송비는 무료이다.
- [x] 장바구니 상품의 수량을 변경할 수 있다.
  - [x] 수량이 0이 되면 상품이 장바구니에서 삭제된다.
- [x] 장바구니에 담긴 상품이 모두 사라지면, 상품 없음 UI를 보여준다.
- [x] 장바구니에 담긴 상품을 삭제 버튼으로 제거할 수 있다.
- [x] 주문 확인 버튼
  - [x] 상품이 있을 경우, 주문 확인 버튼이 활성화된다.
    - [x] 주문 확인 버튼을 누른 경우, 주문 확인 페이지로 이동한다.
  - [x] 상품이 없는 경우, 주문 확인 버튼이 비활성화된다.
- [x] 에러 메세지
  - [x] 장바구니 상품 목록 불러올 때 실패하면
  - [x] 장바구니 상품 수량 조절에서 실패하면

## ✅ 프로그래밍 요구사항

- [x] State Management

  - [x] React의 상태 관리 훅(useState, useReducer)을 사용하여 상태를 구성하고, 필요 시에 Context API 등을 활용해 해당 상태가 필요한 컴포넌트 트리에 상태를 전달합니다.
  - [x] 결제 금액, 배송비 등의 파생 상태(Derived State)를 동적으로 계산한다.

- [x] API

  - [x] /cart-items API를 호출하여 장바구니 데이터를 받아오고 수정한다. API 명세(Swagger)를 참고한다.
  - [x] 관리자 페이지에서 상품 추가 및 삭제가 가능하다.
  - [x] 계정 정보
    - [x] email: github username, password: 'password'

- [] Test

  - [] Jest, React Testing Library를 사용하여 주요 기능에 대한 테스트 케이스를 작성한다.
  - [x] ShoppingCartTest

    - [x] 페이지를 실행시켰을 때, ShoppingCartList가 보여진다.
    - [x] 페이지를 실행시켰을 때, 모든 항목의 체크박스가 활성화된다.
    - [x] 전체 선택 체크박스를 클릭하면 toggleAll이 호출된다
    - [x] 체크박스 클릭 시, 해당하는 상품의 체크 박스가 해제된다.

  - [x] ReceiptTest

    - [x] 주문 금액이 100,000원 미만인 경우 배송비는 3,000원으로 설정된다.
    - [x] 주문 금액이 100,000원 이상인 경우 배송비는 0원으로 설정된다.

  - [] PageTest
    - [] url이 "/"인 경우, "SHOP"이 보여진다.
    - [] url이 "/order-check"인 경우, "결제하기"가 보여진다.

- [x] Routing

  - [x] react-router를 이용하여 페이지를 관리한다.

- [x] Library
  - [x] 스타일링에는 CSS Module, styled-components, emotion 중 한 가지를 선택하여 사용한다.
  - [x] 명시된 라이브러리 외에는 사용하지 않고 직접 구현한다.

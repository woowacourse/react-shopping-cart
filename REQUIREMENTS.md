# 기능 요구사항

## 🌟 공용

- Router

## 🌟 상품 목록

- 상품을 누르면 해당 상품의 상세 페이지로 이동한다.

## 🌟 상품 상세

### 상품이 없는 상태

- 장바구니 버튼을 누른다.
  - 장바구니에 상품을 추가한다.
  - 장바구니로 이동하시겠습니까? 라는 confirm 창이 뜬다.
    - confirm true - 이동
    - confirm false - 그대로 유지

### 상품이 있는 상태

- 장바구니 버튼을 누른다.
  - 이미 장바구니에 상품이 있습니다. 추가하시겠습니까? 라는 confirm 창이 뜬다.
    - confirm true - 상품 추가
    - confirm false - 그대로 유지

## 🌟 장바구니

- 유저가 담은 상품 목록을 볼 수 있다.
- 상품의 수량을 변경할 수 있다.
- 상품을 전체 선택/해제할 수 있다.
  - 선택한 상품을 삭제할 수 있다.
  - 선택한 상품을 주문할 수 있다.

## 🌟 주문/결제

- 유저가 주문한 상품 목록을 볼 수 있다.
- 상품을 결제할 수 있다.

## 🌟 주문 목록

- 유저가 결제한 상품 목록들을 볼 수 있다.
- 유저가 결제한 상품 목록을 다시 장바구니에 담을 수 있다.
- 주문 내역 상세 페이지로 이동할 수 있다.

## 🌟 주문 상세

- 유저가 결제한 상품 목록을 볼 수 있다.
- 유저가 결제한 상품 목록을 다시 장바구니에 담을 수 있다.
- 유저가 결제한 금액의 정보를 볼 수 있다.

## 🌟 컴포넌트 구조도

```
  - component
    - page
      - Products
        - [] ProductList
        - [] ProductDetail

      - Shopping
        - [] 장바구니
        - [] 주문결제
        - [] OrderList
        - [] OrderDetail

    - common
      - [x] Button

    - [x] NavBar
    - [x] PageHeader
    - [x] ProductItem
    - [x] ProductDetail

    - [x] ShoppingItem
    - [x] OrderItem
    - [] CompletedOrderList
    - [x] PaymentSheet
```

## Flow

1. `GET` 사용자가 메인 페이지(Home)에 들어옴

- **API 호출**
  - fetchProducts()
  - fetchCarts()
- **State**
  - fetchedProducts에 상품들이 담김
    ```
    [{
        "product_id": 1,
        "price": 10000,
        "name": "치킨",
        "image_url": "http://example.com/chicken.jpg"
    },{
        "product_id": 2,
        "price": 10000000000,
        "name": "파노강아지",
        "image_url": "http://example.com/chicken.jpg"
    },{
        "product_id": 3,
        "price": 10000000000,
        "name": "코코",
        "image_url": "http://example.com/chicken.jpg"
    },{
        "product_id": 4,
        "price": 100,
        "name": "브랜",
        "image_url": "http://example.com/chicken.jpg"
    },
    ...
    ]
    ```
  - `[fetchCarts State가 비어있을 때]` API 호출 - fetchCarts()
    - 이유: 처음에 CartItems가 비어있다면, 사용자가 Product의 장바구니를 누를 때 무조건 API 호출이 되기 때문에 서버에 똑같은 정보가 저장됨
      ```
        cartItems: [{
          "cart_id": 1,
          "price": 10000,
          "name": "치킨",
          "image_url": "http://example.com/chicken.jpg",
        }]
      ```

2. `POST` 치킨을 장바구니에 담음

- State - cartItems에 치킨이 담김
  - `quantity: 1`, `isChecked: true`를 함께 저장함
    ```
      cartItems: [{
        "cart_id": 1,
        "price": 10000,
        "name": "치킨",
        "image_url": "http://example.com/chicken.jpg",
        "quantity": 1,
        "isChecked": true
      }]
    ```

3. `POST` 치킨을 한 번 더 장바구니에 담음

- API 호출하지 않음

  - 이유:
    - State(cartItems)에 이미 치킨이 존재함
    - API를 호출하게 된다면 장바구니에서 같은 Product들이 여러개 나오기 때문

- State - cartItems에 있는 치킨의 quantity가 +1 됨
  - cartItems에 치킨의 product_id가 있다면, API를 호출하지 않는다.
  - cartItems에 담긴 치킨의 quantity를 1 올려준다.
    ```
      cartItems: [{
        "cart_id": 1,
        "price": 10000,
        "name": "치킨",
        "image_url": "http://example.com/chicken.jpg",
        "quantity" : 2
      }]
    ```

3. `GET` 장바구니 Page에 들어감

- State - cartItems에 있는 내용을 보여줌

- 예외 Case: 사용자가 메인 페이지를 거치지 않고 장바구니 Page에 바로 들어올 때
  - `[fetchCarts State가 비어있을 때]` API 호출 - fetchCarts()

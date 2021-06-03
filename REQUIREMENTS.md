## 컴포넌트 구현

- [x] Header
- [x] ProductImage
- [x] Product
- [x] Button
- [x] PageTitle
- [x] CheckBox
- [x] CartItem
- [x] SubmitBox
- [x] TextWithHighlight
- [x] OrderProductItem
- [x] OrderList

## data schema

- 상품 목록

```ts
  {
    ProductsObject {
      products: {
        [key: string]: {
          name: string
          price: number;
          imageUrl: string
        }
      }
    }
  }
```

- 장바 구니

```ts
{
  cart: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
  }
}
```

- 주문 목록

```ts
{
  orderList: {
    id: number;
    itemList: {
      id: string;
      name: string;
      price: number;
      imageUrl: string;
    }
  }
}
```

## 구현 기능 목록

### 1단계

헤더

- 링크를 통해 페이지를 이동한다.

상품 목록

- 장바구니 버튼 클릭시 상품이 장바구니에 담긴다.

장바구니

- 체크박스 클릭시 상품 선택 해제를 토글할 수 있다.
- 상품삭제 버튼 클릭시 선택된 상품들을 한번에 삭제할 수 있다.
- 휴지통 아이콘 클릭시 상품을 삭제할 수 있다.
- 위 아래 화살표 버튼을 클릭하여 상품 수량을 변경할 수 있다.
- 총 합계 금액과 상품 종류에 대한 정보가 표시된다.
- 주문하기 클릭시 주문/결제 페이지로 이동한다.

주문/결제

- 주문할 물건과 수량, 결제 금액이 표시된다.

### 2단계

상품 상세 페이지

- 상품 id에 해당하는 상품명, 상품 가격이 화면에 나타난다.

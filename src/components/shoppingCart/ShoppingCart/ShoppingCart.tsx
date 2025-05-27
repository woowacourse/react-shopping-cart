import Header from "../Header/Header";
import Item from "../Item/Item";

import { StyledShoppingCart } from "./ShoppingCart.styles";

const dummy = [
  {
    id: 5,
    name: "동물 양말",
    price: 20000,
    imageUrl:
      "https://m.cocosocks.com/web/product/medium/202503/940897aced51144109baa4d145def01f.jpg",
    category: "패션잡화",
    quantity: 10,
  },
  {
    id: 93,
    name: "강자의 포즈",
    price: 8001444,
    imageUrl:
      "https://mblogthumb-phinf.pstatic.net/data2/2004/8/2/82/2-7595.jpg?type=w420",
    category: "패션잡화",
    quantity: 50,
  },
];

export default function ShoppingCart() {
  return (
    <StyledShoppingCart>
      <Header
        title="장바구니"
        description="현재 2종류의 상품이 담겨있습니다."
      />
      {dummy.map((item) => (
        <Item
          key={item.id}
          imageUrl={item.imageUrl}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
    </StyledShoppingCart>
  );
}

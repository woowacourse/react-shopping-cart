import { ItemContent, ItemInfo } from "../CartItem/CartItem.styles";
import CartItemImage from "../CartItem/CartItemImage/CartItemImage";
import CartItemInfo from "../CartItem/CartItemInfo/CartItemInfo";
import { ItemContainer, ItemQuantity } from "./OrderItem.styles";

export default function OrderItem() {
  return (
    <section css={ItemContainer}>
      <div css={ItemInfo}>
        <CartItemImage image="asdfas" />
        <div css={ItemContent}>
          <CartItemInfo name="상품임" price={1000} />
          <p css={ItemQuantity}>2개</p>
        </div>
      </div>
    </section>
  );
}

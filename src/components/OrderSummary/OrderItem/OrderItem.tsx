import { CartItemType } from "../../../types/response";
import {
  ItemContent,
  ItemInfo,
} from "../../Cart/CartItem/CartItem/CartItem.styles";
import CartItemImage from "../../Cart/CartItem/CartItemImage/CartItemImage";
import CartItemInfo from "../../Cart/CartItem/CartItemInfo/CartItemInfo";
import { ItemContainer, ItemQuantity } from "./OrderItem.styles";

interface OrderItemProps {
  cartItem: CartItemType;
}

export default function OrderItem({ cartItem }: OrderItemProps) {
  return (
    <section css={ItemContainer}>
      <div css={ItemInfo}>
        <CartItemImage image={cartItem.product.imageUrl} />
        <div css={ItemContent}>
          <CartItemInfo
            name={cartItem.product.name}
            price={cartItem.product.price}
          />
          <p css={ItemQuantity}>{cartItem.quantity}개</p>
        </div>
      </div>
    </section>
  );
}

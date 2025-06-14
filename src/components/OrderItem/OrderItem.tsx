import { CartItemType } from "../../types/response";
import {
  CountContainer,
  ItemContainer,
  ItemContent,
  ItemDetail,
  ItemInfo,
  ItemPrice,
  ItemTitle,
  ProductImage,
} from "./OrderItem.styles";

interface OrderItemProps {
  orderItem: CartItemType;
}

function OrderItem({ orderItem }: OrderItemProps) {
  const { product, quantity } = orderItem;

  return (
    <>
      <li css={ItemContainer}>
        <div css={ItemInfo}>
          <img
            css={ProductImage}
            src={product.imageUrl}
            onError={(error) => {
              error.currentTarget.src = "default-cartItem.png";
            }}
          ></img>
          <div css={ItemContent}>
            <div css={ItemDetail}>
              <p css={ItemTitle}>{product.name}</p>
              <p css={ItemPrice}>{product.price.toLocaleString()}원</p>
            </div>
            <div css={CountContainer}>
              <p>{quantity}개</p>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default OrderItem;

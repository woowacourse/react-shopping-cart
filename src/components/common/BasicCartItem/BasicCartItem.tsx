/** @jsxImportSource @emotion/react */
import { CartItemImageStyle, CartItemInfoStyle, CartItemNameStyle, CartItemPriceStyle } from "./BasicCartItem.style";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const BasicCartItem = ({ CartItemInfo, children }: React.PropsWithChildren<CartItemProps>) => {
  return (
    <div css={CartItemInfoStyle}>
      <div>
        <img src={CartItemInfo.product.imageUrl} css={CartItemImageStyle} />
      </div>
      <div>
        <div css={CartItemNameStyle}>{CartItemInfo.product.name}</div>
        <div css={CartItemPriceStyle}>{CartItemInfo.product.price.toLocaleString() + "원"}</div>
        {children}
      </div>
    </div>
  );
};

export default BasicCartItem;

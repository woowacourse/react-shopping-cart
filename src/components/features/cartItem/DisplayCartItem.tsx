import * as S from "./CartItem.styles";
import type { CartItemType } from "../../../types/response";
import { handleImageError } from "../../../utils/handleImageError";

const DisplayCartItem = ({ cartData }: { cartData: CartItemType }) => {
  return (
    <div css={S.cartItemWrapper}>
      <div css={S.cartItemStyle}>
        <img
          src={cartData.product.imageUrl}
          alt={cartData.product.name}
          onError={handleImageError}
        />
        <div css={S.cartInfoStyle}>
          <div css={S.cartInfoDetailStyle}>
            <h3 css={S.cartItemNameStyle}>{cartData.product.name}</h3>
            <p css={S.cartItemPriceStyle}>
              {cartData.product.price.toLocaleString()}원
            </p>
          </div>
          <p>{cartData.quantity}개</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayCartItem;

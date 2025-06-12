import * as S from "./CartItem.styles";
import type { CartItemType } from "../../../types/response";
import { handleImageError } from "../../../utils/handleImageError";
import { AccentText } from "../../../styles/@common/title/Title.styles";

interface DisplayCartItemProps {
  cartData: CartItemType;
  bogoQuantity: number;
}

const DisplayCartItem = ({ cartData, bogoQuantity }: DisplayCartItemProps) => {
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
          <p>
            {cartData.quantity}개{" "}
            <span css={AccentText}>
              {bogoQuantity > 0 && `(+${bogoQuantity}개 무료)`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisplayCartItem;

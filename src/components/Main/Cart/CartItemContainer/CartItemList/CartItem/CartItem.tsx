import { useRecoilState } from "recoil";

import { itemEachCheckState } from "@/store/atom/atoms";

import Checkbox from "@/components/Button/Checkbox/Checkbox";
import {
  CartItemContainerStyle,
  CartItemDetailControlsStyle,
  CartItemImageStyle,
  CartItemInfoStyle,
  CartItemNameStyle,
  CartItemPriceStyle,
  CartItemQuantityContainerStyle,
  CartItemQuantityStyle,
} from "./CartItem.style";
import QuantityButton from "@/components/Button/QuantityButton/QuantityButton";
import Divider from "@/components/Divider/Divider";
import Button from "@/components/Button/Button";
import useCartItemModifier from "@/hooks/useCartItemModifier";

interface CartItemProps {
  CartItemInfo: CartItemInfo;
}

const CartItem = ({ CartItemInfo: { id, product } }: CartItemProps) => {
  const [isCheck, setIsCheck] = useRecoilState(itemEachCheckState(id));
  const { quantity, increaseQuantity, decreaseQuantity, deleteProduct } = useCartItemModifier(id);

  return (
    <div css={CartItemContainerStyle}>
      <Divider />
      <div css={CartItemDetailControlsStyle}>
        <Checkbox isCheck={isCheck} onClick={() => setIsCheck(!isCheck)} />
        <Button width="40px" onClick={deleteProduct}>
          삭제
        </Button>
      </div>
      <div css={CartItemInfoStyle}>
        <div>
          <img src={product.imageUrl} css={CartItemImageStyle} />
        </div>
        <div>
          <div css={CartItemNameStyle}>{product.name}</div>
          <div css={CartItemPriceStyle}>{product.price.toLocaleString() + "원"}</div>
          <div css={CartItemQuantityContainerStyle}>
            <QuantityButton onClick={decreaseQuantity} type={"minus"} />
            <div css={CartItemQuantityStyle}>{quantity}</div>
            <QuantityButton onClick={increaseQuantity} type={"plus"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

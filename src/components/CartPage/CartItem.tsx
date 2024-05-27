import { css } from "@emotion/css";
import Button from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";
import { useRecoilState } from "recoil";
import { CartItem as ICartItem } from "../../types/types";

import { patchCartItemQuantity } from "../../api/cartItem";
import { formatCurrency } from "../../utils/formatCurrency";
import { isCheckedSelectorFamily } from "../../recoil/cart/checkedState";
import { quantitySelectorFamily } from "../../recoil/cart/cartItemState";

interface CardItemProps {
  product: ICartItem;
  handleDelete: () => void;
}

const CartItem = ({ product, handleDelete }: CardItemProps) => {
  const [quantity, setQuantity] = useRecoilState(quantitySelectorFamily(product.id));

  const [isChecked, setIsChecked] = useRecoilState(isCheckedSelectorFamily(product.id));

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleIncrement = () => {
    const increasedQuantity = quantity + 1;
    setQuantity(increasedQuantity);
    patchCartItemQuantity(product.id, increasedQuantity);
  };

  const handleDecrement = () => {
    const decreasedQuantity = Math.max(quantity - 1, 1);
    setQuantity(decreasedQuantity);
    patchCartItemQuantity(product.id, decreasedQuantity);
  };

  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button variant={isChecked ? "primary" : "secondary"} onClick={handleChecked}>
          <CheckIcon fill={isChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <Button onClick={handleDelete}>삭제</Button>
      </div>
      <div className={ItemContentCSS}>
        <img src={product.product.imageUrl} className={ItemImageCSS} />
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>{product.product.name}</div>
            <div className={ItemPriceCSS}>{formatCurrency(product.product.price)}</div>
          </div>
          <div className={ItemCountCSS}>
            <Button variant="secondary" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button variant="secondary" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 20px;
`;
const ItemHeaderCSS = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ItemContentCSS = css`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
  align-items: center;
`;

const ItemImageCSS = css`
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;
const ItemInfoWithCountCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 24px;
`;
const ItemInfoCSS = css`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

const ItemNameCSS = css`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
`;
const ItemPriceCSS = css`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  line-height: 34.75px;
  text-align: left;
`;
const ItemCountCSS = css`
  display: flex;
  column-gap: 8px;
  justify-content: flex-start;
  align-items: center;
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: center;
`;

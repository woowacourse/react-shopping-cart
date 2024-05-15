import React, { useEffect } from "react";
import { css } from "@emotion/css";
import { Button } from "../default/Button";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";
import { useRecoilCallback, useRecoilState } from "recoil";
import { cartItemCheckedIdsAtom, cartItemCheckedAtomFamily, cartItemQuantityAtomFamily } from "../../recoil/atom";
import { Product } from "../../types";
import { cartItemCheckedIdsSelectorFamily, cartItemQuantitySelector } from "../../recoil/selector";
import { changeCartItemQuantity } from "../../api/cartItem";

interface CardItemProps {
  product: Product;
}

// const useItemCheckedState = useRecoilCallback(({ set }) => (id: number) => {
//   const [cartItemChecked, setCartItemChecked] = useRecoilState(cartItemCheckedState(id));
//   const [cartItemCheckedIds, setCartItemCheckedIds] = useRecoilState(cartItemCheckedIdsState);
//   setCartItemCheckedIds([...cartItemCheckedIds, id]);
//   return { cartItemChecked, setCartItemChecked };
// });
const CartItem = ({ product }: CardItemProps) => {
  const [cartItemChecked, setCartItemChecked] = useRecoilState(cartItemCheckedIdsSelectorFamily(product.id));
  // const [quantity, setQuantity] = useRecoilState(cartItemQuantityState({ id: product.id, quantity: product.quantity }));
  const [quantity, setQuantity] = useRecoilState(cartItemQuantityAtomFamily(product.id));
  // const [quantity, setQuantity] = useRecoilState(cartItemQuantitySelector(product.id));

  const handleChecked = () => {
    setCartItemChecked(!cartItemChecked);
  };

  const handleIncrement = () => {
    const increasedQuantity = quantity + 1;
    changeCartItemQuantity(product.id, increasedQuantity);
    setQuantity(increasedQuantity);
  };

  const handleDecrement = () => {
    const decreasedQuantity = Math.max(quantity - 1, 0);
    changeCartItemQuantity(product.id, decreasedQuantity);
    setQuantity(decreasedQuantity);
  };

  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button variant={cartItemChecked ? "primary" : "secondary"} onClick={handleChecked}>
          <CheckIcon fill={cartItemChecked ? "#ffffff" : "#0000001A"} />
        </Button>
        <Button>삭제</Button>
      </div>
      <div className={ItemContentCSS}>
        <img src={product.product.imageUrl} className={ItemImageCSS} />
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>{product.product.name}</div>
            <div className={ItemPriceCSS}>{product.product.price}</div>
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

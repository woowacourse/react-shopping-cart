import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { css } from "@emotion/css";
import { cartItemCheckedIdsAtom } from "../../recoil/atom/atom";
import { quantitySelectorFamily } from "../../recoil/selector/selector";
import { useCartItemChecked } from "../../hooks/useCartItemChecked/useCartItemChecked";
import { useCartActions } from "../../hooks/useCartActions/useCartActions";
import { Product } from "../../types/product";
import { Button, ProductInfo, Splitter } from "../default";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";

interface CartItemProps {
  product: Product;
}

const CartItem = ({ product }: CartItemProps) => {
  const checkedIds = useRecoilValue(cartItemCheckedIdsAtom);
  const [quantity, setQuantity] = useRecoilState(quantitySelectorFamily(product.id));
  const { handleCheckedIds } = useCartItemChecked();
  const { handleUpdateQuantity, handleDeleteItem } = useCartActions();

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity, setQuantity]);

  return (
    <div className={CartItemCSS}>
      <Splitter />
      <div className={CartItemHeaderCSS}>
        <Button
          variant={checkedIds.includes(product.id) ? "primary" : "secondary"}
          size="small"
          onClick={() => handleCheckedIds(product.id)}
        >
          <CheckIcon fill={checkedIds.includes(product.id) ? "var(--grey-100)" : "var(--grey-200)"} />
        </Button>
        <Button
          variant="secondary"
          size="medium"
          onClick={() => handleDeleteItem(product.id)}
        >
          삭제
        </Button>
      </div>

      <ProductInfo
        product={product}
        quantityNode={
          <div className={CartItemQuantityControlsCSS}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleUpdateQuantity(product, Math.max(quantity - 1, 1))}
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleUpdateQuantity(product, quantity + 1)}
            >
              <PlusIcon />
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default CartItem;

const CartItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CartItemHeaderCSS = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartItemQuantityControlsCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font: var(--cart-label);
  color: var(--grey-400);
`;

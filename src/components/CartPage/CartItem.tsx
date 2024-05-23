import { css } from "@emotion/css";
import CheckIcon from "../../assets/CheckIcon.svg?react";
import MinusIcon from "../../assets/MinusIcon.svg?react";
import PlusIcon from "../../assets/PlusIcon.svg?react";
import { useRecoilState } from "recoil";
import { Product } from "../../types/product";
import { patchCartItemQuantity } from "../../api/cartItemApi";
import { cartItemCheckedIdsAtom } from "../../recoil/atom/atom";
import { quantitySelectorFamily } from "../../recoil/selector/selector";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../default";
import { useEffect } from "react";

interface CardItemProps {
  product: Product;
  handleDelete: () => void;
}

const CartItem = ({ product, handleDelete }: CardItemProps) => {
  const [checkedIds, setCheckedIds] = useRecoilState(cartItemCheckedIdsAtom);
  const [quantity, setQuantity] = useRecoilState(quantitySelectorFamily(product.id));

  useEffect(() => {
    setQuantity(product.quantity);
  }, []);

  const handleChecked = () => {
    setCheckedIds((prev) => (prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]));
  };

  const updateQuantity = (newQuantity: number) => {
    patchCartItemQuantity(product.id, newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <div className={ItemCSS}>
      <div className={ItemHeaderCSS}>
        <Button
          variant={checkedIds.includes(product.id) ? "primary" : "secondary"}
          size="small"
          onClick={handleChecked}
        >
          <CheckIcon fill={checkedIds.includes(product.id) ? "var(--grey-100)" : "var(--grey-200)"} />
        </Button>
        <Button
          variant="secondary"
          size="medium"
          onClick={handleDelete}
        >
          삭제
        </Button>
      </div>
      <div className={ItemContentCSS}>
        <img
          src={product.product.imageUrl}
          className={ItemImageCSS}
        />
        <div className={ItemInfoWithCountCSS}>
          <div className={ItemInfoCSS}>
            <div className={ItemNameCSS}>{product.product.name}</div>
            <div className={ItemPriceCSS}>{formatCurrency(product.product.price)}</div>
          </div>
          <div className={ItemCountCSS}>
            <Button
              variant="secondary"
              size="small"
              onClick={() => updateQuantity(Math.max(quantity - 1, 1))}
            >
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button
              variant="secondary"
              size="small"
              onClick={() => updateQuantity(quantity + 1)}
            >
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
  font: var(--cart-label);
  color: var(--grey-400);
  text-align: left;
`;
const ItemPriceCSS = css`
  font: var(--cart-title);
  text-align: left;
`;
const ItemCountCSS = css`
  display: flex;
  column-gap: 8px;
  justify-content: flex-start;
  align-items: center;
  font: var(--cart-label);
  color: var(--grey-400);
  text-align: center;
`;

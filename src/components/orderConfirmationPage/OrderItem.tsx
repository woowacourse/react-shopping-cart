import { css } from "@emotion/css";
import { useRecoilState } from "recoil";
import { Product } from "../../types/product";
import { quantitySelector } from "../../recoil/selector/selector";
import { formatCurrency } from "../../utils/formatCurrency";

interface CardItemProps {
  product: Product;
}

const OrderItem = ({ product }: CardItemProps) => {
  const [quantities, setQuantity] = useRecoilState(quantitySelector);
  const quantity = quantities[product.id];

  return (
    <div className={ItemCSS}>
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
          <div className={ItemCountCSS}>{quantity}개</div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;

const ItemCSS = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 12px;
  padding-bottom: 20px;
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
  gap: 24px;
`;
const ItemInfoCSS = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemNameCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;
const ItemPriceCSS = css`
  font: var(--cart-title);
`;
const ItemCountCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;

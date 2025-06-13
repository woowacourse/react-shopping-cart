import { css } from "@emotion/css";
import Text from "../@common/Text/Text";
import { Product } from "../../types/type";

interface CartItemCardProps {
  product: Product;
  quantityContent?: React.ReactNode;
  topRightContent?: React.ReactNode;
  topLeftContent?: React.ReactNode;
}

const CartItemCard = ({
  product,
  quantityContent,
  topRightContent,
  topLeftContent,
}: CartItemCardProps) => {
  const imgUrl = product.imageUrl;
  const name = product.name;
  const price = product.price;

  return (
    <div className={CartItemStyled}>
      <hr className={Divider} />
      {(topLeftContent || topRightContent) && (
        <div className={CartItemTop}>
          <div>{topLeftContent}</div>
          <div>{topRightContent}</div>
        </div>
      )}
      <div className={CartItemContent}>
        <img
          className={CartItemImage}
          src={imgUrl || "./default.png"}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = "./default.png";
          }}
        />
        <div className={CartItemDetails}>
          <Text text={name} />
          <Text text={price.toLocaleString() + "원"} type="large" />
          {quantityContent}
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

const CartItemStyled = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const Divider = css`
  border: 0.5px solid #e0e0e0;
`;

const CartItemTop = css`
  display: flex;
  justify-content: space-between;
`;

const CartItemContent = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

const CartItemDetails = css`
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: space-between;
`;

const CartItemImage = css`
  width: 112px;
  height: 112px;
  object-fit: cover;
`;

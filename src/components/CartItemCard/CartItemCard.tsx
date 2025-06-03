import { css } from "@emotion/css";
import TextButton from "../@common/Button/TextButton/TextButton";
import ToggleButton from "../@common/Button/ToggleButton/ToggleButton";
import Text from "../@common/Text/Text";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import { useDeleteCartItem } from "../../hooks/useDeleteCartItem";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";

interface CartItemCardProps {
  cartItemId: number;
  imgUrl: string;
  name: string;
  price: number;
  quantity: number;
  isSelected: boolean;
  handleToggle: (cartItemId: number) => void;
}

const CartItemCard = ({
  cartItemId,
  imgUrl,
  name,
  price,
  quantity,
  isSelected,
  handleToggle,
}: CartItemCardProps) => {
  const { deleteCartItem } = useDeleteCartItem();
  const { updateCartItem } = useUpdateCartItem();

  return (
    <>
      <div className={CartItemStyled}>
        <hr className={Divider} />
        <div className={CartItemTop}>
          <ToggleButton
            isSelected={isSelected}
            onClick={() => handleToggle(cartItemId)}
            testId="item-toggle"
          />
          <TextButton
            text="삭제"
            onClick={() => {
              deleteCartItem(cartItemId);
            }}
          />
        </div>
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
            <div className={QuantityStepperWrapper}>
              <QuantityStepper
                quantity={quantity}
                onDecrease={() => {
                  updateCartItem(cartItemId, quantity - 1);
                }}
                onIncrease={() => {
                  updateCartItem(cartItemId, quantity + 1);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
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
  flex-direction: row;
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
`;

const QuantityStepperWrapper = css`
  margin-top: 24px;
`;

const CartItemImage = css`
  width: 112px;
  height: 112px;
  border: none;
  object-fit: cover;
`;

import * as S from "./CartCardList.styled";
import Button from "../../../../components/common/Button";
import CheckBox from "../../../../components/common/CheckBox";
import QuantityRegulator from "../../../../components/QuantityRegulator";
import CartCard from "../../../../components/CartCard";
import { UseCartReturnType } from "../../../../types/cartItem";

const CartCardList = ({ cartItemListProps }: { cartItemListProps: UseCartReturnType["cartItemListProps"] }) => {
  const { cartItems, handleCartItemChange, isAllChecked, handleCheckChange } = cartItemListProps;

  return (
    <S.Container>
      <CheckBox isChecked={isAllChecked} onClick={() => handleCheckChange({ action: "all" })}>
        전체선택
      </CheckBox>

      <S.List>
        {cartItems.map((item) => {
          const { id, isChecked, quantity, product } = item;
          return (
            <CartCard gap={12} key={id}>
              <CartCard.Top>
                <CheckBox isChecked={isChecked} onClick={() => handleCheckChange({ id, action: "each" })} />
                <Button variant="secondary" size="auto" onClick={() => handleCartItemChange({ id, action: "delete" })}>
                  삭제
                </Button>
              </CartCard.Top>
              <CartCard.Content gap={24}>
                <CartCard.Image src={product.imageUrl} alt={product.name} />
                <CartCard.Information gap={24}>
                  <CartCard.Information gap={4}>
                    <CartCard.Title text={product.name} />
                    <CartCard.Price price={product.price} />
                  </CartCard.Information>
                  <QuantityRegulator
                    quantity={quantity}
                    maxStock={product.quantity!}
                    handleDecrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity - 1 })}
                    handleIncrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity + 1 })}
                  />
                </CartCard.Information>
              </CartCard.Content>
            </CartCard>
          );
        })}
      </S.List>
    </S.Container>
  );
};

export default CartCardList;

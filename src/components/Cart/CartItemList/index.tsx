import * as S from "./CartItemList.styled";
import { UseCartReturnType } from "../../../hooks/useCart";
import Button from "../../common/Button";
import CheckBox from "../../common/CheckBox";
import QuantityRegulator from "../../QuantityRegulator";
import CartItem from "../CartItem/index";

const CartItemList = ({ cartItemListProps }: { cartItemListProps: UseCartReturnType["cartItemListProps"] }) => {
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
            <CartItem gap={12} key={id}>
              <CartItem.Top>
                <CheckBox isChecked={isChecked} onClick={() => handleCheckChange({ id, action: "each" })} />
                <Button variant="secondary" size="auto" onClick={() => handleCartItemChange({ id, action: "delete" })}>
                  삭제
                </Button>
              </CartItem.Top>
              <CartItem.Content gap={24}>
                <CartItem.Image src={product.imageUrl} alt={product.name} />
                <CartItem.Information gap={24}>
                  <CartItem.Information gap={4}>
                    <CartItem.Title text={product.name} />
                    <CartItem.Price price={product.price} />
                  </CartItem.Information>
                  <QuantityRegulator
                    quantity={quantity}
                    maxStock={product.quantity!}
                    handleDecrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity - 1 })}
                    handleIncrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity + 1 })}
                  />
                </CartItem.Information>
              </CartItem.Content>
            </CartItem>
          );
        })}
      </S.List>
    </S.Container>
  );
};

export default CartItemList;

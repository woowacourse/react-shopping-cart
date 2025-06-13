import * as S from "./CartItemList.styled";
import Button from "../../../../shared/components/common/Button";
import CheckBox from "../../../../shared/components/common/CheckBox";
import QuantityRegulator from "../../../../shared/components/QuantityRegulator";
import ItemCard from "../../../../shared/components/ItemCard/index";
import { useCartContext } from "../../contexts/CartContext";

const CartItemList = () => {
  const { cartItemListProps } = useCartContext();
  const { cartItems, checkedIds, handleCartItemChange, isAllChecked, handleCheckChange } = cartItemListProps;

  return (
    <S.Container>
      <CheckBox isChecked={isAllChecked} onClick={() => handleCheckChange({ action: "all" })}>
        전체선택
      </CheckBox>
      <S.List>
        {cartItems.map((item) => {
          const { id, quantity, product } = item;
          return (
            <ItemCard gap={12} key={id}>
              <ItemCard.Top>
                <CheckBox
                  isChecked={checkedIds.includes(id)}
                  onClick={() => handleCheckChange({ id, action: "each" })}
                />
                <Button variant="secondary" size="auto" onClick={() => handleCartItemChange({ id, action: "delete" })}>
                  삭제
                </Button>
              </ItemCard.Top>
              <ItemCard.Content gap={24}>
                <ItemCard.Image src={product.imageUrl} alt={product.name} />
                <ItemCard.Information gap={24}>
                  <ItemCard.Information gap={4}>
                    <ItemCard.Title text={product.name} />
                    <ItemCard.Price price={product.price} />
                  </ItemCard.Information>
                  <QuantityRegulator
                    quantity={quantity}
                    handleDecrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity - 1 })}
                    handleIncrease={() => handleCartItemChange({ id, action: "patch", quantity: quantity + 1 })}
                  />
                </ItemCard.Information>
              </ItemCard.Content>
            </ItemCard>
          );
        })}
      </S.List>
    </S.Container>
  );
};

export default CartItemList;

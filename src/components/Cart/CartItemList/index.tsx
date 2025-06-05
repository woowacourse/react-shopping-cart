import * as S from "./CartItemList.styled";
import { UseCartReturnType } from "../../../hooks/useCart";
import Button from "../../common/Button";
import CheckBox from "../../common/CheckBox";
import QuantityRegulator from "../../QuantityRegulator";
import ItemCard from "../../ItemCard/index";

const CartItemList = ({ cartItemListProps }: { cartItemListProps: UseCartReturnType["cartItemListProps"] }) => {
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
                <CheckBox isChecked={checkedIds.has(id)} onClick={() => handleCheckChange({ id, action: "each" })} />
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

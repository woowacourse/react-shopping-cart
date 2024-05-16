import CheckboxButton from "../Button/CheckboxButton/index";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import CartItem from "../CartItem/index";
import { uncheckAllCartItemSelector, checkAllCartSelector } from "../../recoil/selectors";
import { cartItemsState, checkedCartItemsState } from "../../recoil/atoms";
import styled from "styled-components";

const CartItemList = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);
  const checkAllCartItem = useSetRecoilState(checkAllCartSelector);
  const uncheckAllCartItem = useSetRecoilState(uncheckAllCartItemSelector);

  const isAllChecked = checkedCartItems.length === cartItems?.length ? true : false;

  const allCartItems = cartItems ? cartItems.map((item) => item.id) : [];

  const removeCartItem = (itemId: number) => {
    setCartItems((prevItems) => prevItems?.filter((item) => item.id !== itemId));
  };

  return (
    <CartItemListContainer>
      <TopContainer>
        {cartItems && (
          <CheckboxButton
            id={"checkAllButton"}
            isChecked={isAllChecked}
            onClick={() => (isAllChecked ? uncheckAllCartItem() : checkAllCartItem(allCartItems))}
          />
        )}
        <CheckAllLabel htmlFor={"checkAllButton"}>전체선택</CheckAllLabel>
      </TopContainer>{" "}
      {cartItems?.map((item) => (
        <CartItem key={item.id} id={item.id} product={item.product} removeCartItem={removeCartItem} />
      ))}
    </CartItemListContainer>
  );
};

export default CartItemList;

const CartItemListContainer = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const CheckAllLabel = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  text-align: left;
  color: black;
`;

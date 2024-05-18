import CheckboxButton from "../Button/CheckboxButton/index";
import { useRecoilState } from "recoil";
import CartItem from "../CartItem/index";
import { checkedCartItemsState } from "../../recoil/atoms";
import styled from "styled-components";
import { COLOR, FONT_SIZE, FONT_WEIGHT } from "../../constants/styles";
import { CartItemResponse } from "../../types/ShoppingCart";

interface CartItemListProps {
  cartItems: CartItemResponse[];
  removeCartItem: (itemId: number) => void;
}

const CartItemList = ({ cartItems, removeCartItem }: CartItemListProps) => {
  const [checkedCartItems, setCheckedCartItems] = useRecoilState(checkedCartItemsState);
  const checkAllCartItem = (cartItemIds: number[]) => setCheckedCartItems(cartItemIds);
  const uncheckAllCartItem = () => setCheckedCartItems([]);

  const isAllChecked = checkedCartItems.length === cartItems?.length;

  const allCartItemsId = cartItems ? cartItems.map((item) => item.id) : [];

  return (
    <CartItemListContainer>
      <TopContainer>
        {cartItems && (
          <CheckboxButton
            id={"checkAllButton"}
            isChecked={isAllChecked}
            onClick={() => (isAllChecked ? uncheckAllCartItem() : checkAllCartItem(allCartItemsId))}
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
  font-size: ${FONT_SIZE.small};
  font-weight: ${FONT_WEIGHT.medium};
  line-height: 15px;
  text-align: left;
  color: ${COLOR.black};
`;

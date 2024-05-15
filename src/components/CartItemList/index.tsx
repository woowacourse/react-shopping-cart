import CheckboxButton from "../Button/CheckboxButton/index";
import { useState, useEffect } from "react";
import { fetchCartItems } from "../../api/cartItem";
import { CartItemResponse } from "../../types/ShoppingCart";
import { useSetRecoilState, useRecoilValue } from "recoil";
import CartItem from "../CartItem/index";
import { setCartPrice, resetCartSelect, checkAllCartSelect } from "../../recoil/selectors";
import { cartSelectedState } from "../../recoil/atoms";
import styled from "styled-components";

const CartItemList = () => {
  const [cartItems, setCartItems] = useState<CartItemResponse[]>();
  const handleCartPrice = useSetRecoilState(setCartPrice);
  const cartLists = useRecoilValue(cartSelectedState);
  const resetCart = useSetRecoilState(resetCartSelect);
  const checkAllCart = useSetRecoilState(checkAllCartSelect);

  const isAllChecked = cartLists.length === cartItems?.length ? true : false;

  const allCartItems = cartItems ? cartItems.map((item) => item.product.id) : [];

  const fetchData = async () => {
    const result = await fetchCartItems();
    setCartItems(result);
    handleCartPrice(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CartItemListContainer>
      <TopContainer>
        {cartItems && (
          <CheckboxButton
            id={"checkAllButton"}
            isChecked={isAllChecked}
            onClick={() => (isAllChecked ? resetCart() : checkAllCart(allCartItems))}
          />
        )}
        <CheckAllLabel htmlFor={"checkAllButton"}>전체선택</CheckAllLabel>
      </TopContainer>{" "}
      {cartItems?.map((item) => <CartItem key={item.id} product={item.product} />)}
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

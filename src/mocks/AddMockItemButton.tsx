import { postCartItem } from "@/apis/cart";
import Button from "@/components/_common/Button/Button";
import { addMockData } from "@/mocks/addCartItemList";
import { cartItemSelector, cartItemsState } from "@/recoil/cartItems";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const AddMockItemButton = () => {
  const newCartItems = useRecoilValue(cartItemSelector);
  const setCartItems = useSetRecoilState(cartItemsState);

  const onAddItems = () => {
    addMockData.forEach((item) => {
      const { productId, quantity } = item;
      postCartItem({ productId, quantity });
    });
    setCartItems(newCartItems);
  };

  return (
    <Wrapper>
      <Button onClick={onAddItems}>상품 추가</Button>
    </Wrapper>
  );
};

export default AddMockItemButton;

const Wrapper = styled.div`
  height: 100px;
`;

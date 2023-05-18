import { styled } from "styled-components";
import { cartListSelector } from "recoil/selector";
import { useRecoilState } from "recoil";
import CartItem from "components/CartItem";

const CartItemList = () => {
  const [cartList, setCartList] = useRecoilState(cartListSelector);

  return (
    <Wrapper>
      {cartList.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  list-style: none;
  row-gap: 10px;

  width: 60%;
`;

export default CartItemList;

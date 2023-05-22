import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { totalCartCount } from "../atoms/cartState";
import { useRefreshableRecoilValue } from "../hooks/useRefreshableAtom";

interface CartQuantityProps {
  user?: string;
}

export default function CartQuantity({ user }: CartQuantityProps) {
  const totalCart = useRefreshableRecoilValue(totalCartCount);
  const navigate = useNavigate();

  function moveCartPage() {
    navigate("/cart");
  }

  return (
    <CartQuantityContainer onClick={moveCartPage}>
      <div>{user ? `${user}의` : ``}장바구니</div>
      <Quantity>{totalCart}</Quantity>
    </CartQuantityContainer>
  );
}

const CartQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.h2}
  color : ${({ theme }) => theme.colors.white}
`;

const Quantity = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 2.6rem;
  height: 2.6rem;
  padding-top: 0.3rem;
  margin-left: 2rem;

  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue_green};
`;

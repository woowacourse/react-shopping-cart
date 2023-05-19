import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';
import QuantityCircle from './ProductListPage/QuantityCircle';
import { Suspense } from 'react';

interface CartQuantityProps {
  user?: string;
}

export default function CartQuantity({ user }: CartQuantityProps) {
  const navigate = useNavigate();

  return (
    <CartQuantityContainer onClick={() => navigate('/cart')}>
      <div>{user && `${user}의 `}장바구니</div>
      <Suspense fallback={<Quantity>..</Quantity>}>
        <QuantityCircle />
      </Suspense>
    </CartQuantityContainer>
  );
}

const CartQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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

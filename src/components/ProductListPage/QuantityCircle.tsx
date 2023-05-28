import { useRecoilValue } from 'recoil';
import { cartTotalState } from '../../atoms/cartState';

import styled from 'styled-components';

export default function QuantityCircle() {
  const totalCart = useRecoilValue(cartTotalState);

  return <Quantity>{totalCart}</Quantity>;
}

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

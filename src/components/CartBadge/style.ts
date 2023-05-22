import styled from 'styled-components';

import { appearAnimation, disappearAnimation } from '@Animations/index';

export const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const Username = styled.div`
  margin-right: 5px;
  color: #ffffff;
`;

type QuantityProps = {
  isEmpty: boolean;
};

export const CartItemsAmount = styled.div<QuantityProps>`
  background-color: #06c09e;
  color: #ffffff;

  font-weight: 700;
  font-size: 12px;

  width: 24px;
  height: 24px;

  padding-left: 1px;
  padding-top: 1px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${(props) => props.isEmpty && '0'};
  animation: ${(props) => (props.isEmpty ? disappearAnimation : appearAnimation)} 0.3s ease forwards;
  transition: opacity 0.3s ease;
`;

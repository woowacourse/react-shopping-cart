import styled from 'styled-components';
import { COLOR } from '../../constants';

export const Description = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const Price = styled.span`
  font-size: 1.25rem;
  line-height: 1.6rem;
  color: ${COLOR.BLACK};
`;

export const CartButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  padding: 0.25rem 0 0;
  text-align: center;
  transform: translateY(-30%);

  &:hover {
    background: #f5f5f5;
  }
`;

// TODO: img SVG 색상 바꾸는 법 찾아보기 (not brightness)
export const CartIcon = styled.img`
  // color: ${COLOR.BLACK};
  width: 30px;
  height: 26px;
  filter: brightness(0);
`;

import { SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const CartItemContainer = styled.section`
  margin-top: 20px;
  width: 100%;
`;

export const EmptyCart = styled.div`
  width: 100%;
  height: calc(100vh - ${SIZE.bottomButtonHeight} - ${SIZE.navigationHeight}*2 - ${SIZE.layoutPadding});
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

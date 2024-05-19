import { SIZE } from '@styles/style.constant';
import styled from 'styled-components';

export const CartItemContainer = styled.section`
  margin-top: 20px;
  width: 100%;
`;

export const CartInfoBanner = styled.p`
  padding: 52px 0px 12px 0px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ShippingFeeInfo = styled.span`
  padding-top: 2px;
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const EmptyCart = styled.div`
  width: 100%;
  height: calc(100vh - ${SIZE.bottomButtonHeight} - ${SIZE.navigationHeight}*2 - 24px);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

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

export const CartInfoBannerText = styled.span`
  padding-top: 2px;
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const Fallback = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 64px * 2 - 100px);
`;

import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 24px 36px;
  flex-grow: 1;
  height: calc(100vh - 128px);
`;

export const Logo = styled.a`
  font-weight: 800;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  flex-grow: 1;
  overflow: hidden;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 32px 0;
  flex-grow: 1;
  gap: 20px;
  min-height: 0;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-right: 12px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const PriceSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
`;

export const PriceInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #0000001a;
  padding-top: 12px;
`;

import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 24px 40px;
`;

export const Logo = styled.a`
  font-weight: 800;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 0 52px;
  flex-grow: 1;
  gap: 20px;
`;

export const CartItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: 400px;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

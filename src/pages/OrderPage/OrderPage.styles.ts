import styled from "@emotion/styled";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const Back = styled.a`
  text-decoration: none;
`;

export const BackIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  margin: 40px 0;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
`;

export const Label = styled.div`
  font-weight: 700;
  font-size: 18px;
`;

export const Price = styled.div`
  font-weight: 700;
  font-size: 26px;
`;

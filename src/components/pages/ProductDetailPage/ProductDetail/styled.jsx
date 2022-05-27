import styled from "styled-components";

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme: { color } }) => color.gray01};
  padding: 16px;
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 16px 20px;
`;

export const ProductImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const ProductName = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
  font-weight: 700;
  color: ${({ theme: { color } }) => color.gray01};
  padding: 8px 0;
`;

export const ProductPriceTitle = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  color: ${({ theme: { color } }) => color.gray01};
  margin: auto 0;
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.medium};
  color: ${({ theme: { color } }) => color.gray01};
`;

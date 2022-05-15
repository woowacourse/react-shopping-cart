import styled from "styled-components";

export const DetailContainer = styled.section`
  width: 400px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid #333;
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
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkGrey};
  padding: 8px 0;
`;

export const Span = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.darkGrey};
  margin: auto 0;
`;

export const ProductPrice = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.darkGrey};
`;

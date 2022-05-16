import styled from "styled-components";

export const DetailContainer = styled.section`
  width: 400px;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${({ theme: { color } }) => color.text};
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
  font-size: ${({ theme: { fontSize } }) => fontSize.default};
  font-weight: 700;
  color: ${({ theme: { color } }) => color.text};
  padding: 8px 0;
`;

export const Span = styled.span`
  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  color: ${({ theme: { color } }) => color.text};
  margin: auto 0;
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme: { fontSize } }) => fontSize.default};
  color: ${({ theme: { color } }) => color.text};
`;

import styled from "styled-components";

export const ProductCartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;

  width: 700px;
  padding: 16px 0;

  border-bottom: 1px solid ${({ theme: { color } }) => color.gray03};
`;

export const ProductCartImage = styled.img`
  width: 145px;
  height: 145px;

  object-fit: cover;
`;

export const ProductCartName = styled.p`
  flex-grow: 1;

  color: ${({ theme: { color } }) => color.gray01};
`;

export const ProductCartPrice = styled.p`
  color: ${({ theme: { color } }) => color.gray01};
`;

export const ProductCartControlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

import styled from "styled-components";

export const CartListControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 0;
`;

export const DeleteCartButton = styled.button`
  width: 120px;
  height: 50px;
  padding: 8px 16px;

  font-size: ${({ theme: { fontSize } }) => fontSize.small};
  text-align: center;
  color: ${({ theme: { color } }) => color.text};
  background-color: ${({ theme: { color } }) => color.main};
  border: 1px solid ${({ theme: { color } }) => color.border};
  cursor: pointer;

  :active {
    color: ${({ theme: { color } }) => color.point};
    border: 1px solid ${({ theme: { color } }) => color.point};
  }
`;

export const CartListCount = styled.p`
  padding: 16px 0;
  border-bottom: 4px solid ${({ theme: { color } }) => color.border};
`;

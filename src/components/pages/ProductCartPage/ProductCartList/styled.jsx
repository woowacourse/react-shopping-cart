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

  ${({ theme: { fontSize, color } }) => `
    font-size: ${fontSize.small};
    text-align: center;
    color: ${color.gray01};
    background-color: ${color.main};
    border: 1px solid ${color.gray03};
    cursor: pointer;

    &:active {
      color: ${color.point};
      border: 1px solid ${color.point};
    }

    &:disabled {
      color: ${color.gray02};
      border: 1px solid ${color.gray03};
      cursor: default;
    }
  `}
`;

export const CartListCount = styled.p`
  padding: 16px 0;
  border-bottom: 4px solid ${({ theme: { color } }) => color.gray03};
`;

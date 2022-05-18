import styled from "styled-components";

export const CartPageContainer = styled.section`
  display: grid;
  grid-template-areas:
    "header header"
    "list payment";

  height: 100%;
  overflow: auto;
`;

export const CartPageHeader = styled.h2`
  grid-area: header;

  height: fit-content;
  padding: 16px 0;

  text-align: center;
  border-bottom: 4px solid ${({ theme: { color } }) => color.text};
`;

export const CartPageList = styled.div`
  grid-area: list;

  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px;
`;

export const CartPagePayment = styled.div`
  grid-area: payment;

  padding: 16px;
`;

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

import styled from "styled-components";

export const CartPageContainer = styled.section`
  display: grid;
  grid-template-areas:
    "header header"
    "list payment";
  gap: 16px;

  height: 100%;
  overflow: auto;
`;

export const CartPageHeader = styled.h2`
  grid-area: header;

  height: fit-content;
  padding: 16px 0;

  text-align: center;
  border-bottom: 4px solid ${({ theme: { color } }) => color.gray01};
`;

export const CartPageList = styled.div`
  grid-area: list;

  display: flex;
  flex-direction: column;
  gap: 16px;

  min-width: 700px;
  width: fit-content;
  padding: 16px;
`;

export const CartPagePayment = styled.div`
  grid-area: payment;

  padding: 16px;
`;

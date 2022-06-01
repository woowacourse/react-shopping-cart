import styled from "@emotion/styled";

export const Title = styled.h2`
  font-weight: 700;
  font-size: 2rem;
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-bottom: 4px solid #333333;
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  width: 60%;
  justify-content: space-between;
  padding: 2rem 0;
`;

export const DeleteButton = styled.button`
  border: 1px solid #bbbbbb;
  background-color: inherit;
  padding: 1rem;
`;

export const ItemListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const OrderContainer = styled.div`
  width: 35%;
`;

export const CartTitle = styled.p`
  padding: 1rem;
  font-size: 1.5rem;
  color: #333333;
  border-bottom: 2px solid #aaa;
`;

export const ItemOrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

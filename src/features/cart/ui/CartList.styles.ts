import styled from '@emotion/styled';

export const CartListContainer = styled.section`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const AllSelectContainer = styled.div`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
`;

export const AllSelectInputBox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: black;
`;

export const CartItemCardContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

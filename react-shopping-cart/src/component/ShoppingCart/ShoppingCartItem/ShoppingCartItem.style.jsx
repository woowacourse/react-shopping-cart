import styled from "styled-components";

export const CartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 490px;
  padding: 20px 5px;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors["gray_03"]};
`;

export const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-end;
`;

export const TrashContainer = styled.div`
  cursor: pointer;
`;

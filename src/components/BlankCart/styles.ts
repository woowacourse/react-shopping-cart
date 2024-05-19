import styled from '@emotion/styled';

export const BlankCartContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: ${({ theme }) => theme.spacer.spacing5};
`;

export const AddItemsToServerButton = styled.button`
  display: block;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacer.spacing3};

  &:hover {
    cursor: pointer;
  }
`;

import { styled } from 'styled-components';

export const SelectionActions = styled.div`
  display: flex;
  align-items: center;

  column-gap: 12px;

  @media screen and (max-width: 767px) {
    width: 100%;

    justify-content: space-between;
  }

  font-size: 14px;
`;

export const ToggleAllCheckBox = styled.div`
  display: flex;
  align-items: center;

  & > input {
    margin-right: 15px;
  }
`;

export const DeleteSelectedItemButton = styled.button`
  width: 70px;
  height: 30px;

  background-color: var(--grey-100);

  border: 1px solid var(--grey-300);
  border-radius: 8px;

  font-weight: 600;

  cursor: pointer;

  &:hover {
    background-color: var(--grey-200);
  }
`;

import styled from 'styled-components';

export const Pagination = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export const PaginationButtonWrapper = styled.div``;

export const PaginationButton = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  font-size: 18px;
  line-height: 21px;
  border-radius: 4px;
  ${({ theme, isActive }) => isActive && `background-color: ${theme.PRIMARY_COLOR}`};
  color: ${({ theme, isActive }) => (isActive ? theme.WHITE : theme.TEXT_COLOR)};
  transition: color 0.5s, background-color 0.5s;

  &:not(:last-child) {
    margin-right: 10px;
  }

  &:hover {
    color: ${({ theme }) => theme.WHITE};
    background-color: ${({ theme }) => theme.MINT_500};
  }
`;

export const PrevButtonWrapper = styled.button`
  margin-right: 24px;
`;

export const NextButtonWrapper = styled.button`
  margin-left: 24px;
`;

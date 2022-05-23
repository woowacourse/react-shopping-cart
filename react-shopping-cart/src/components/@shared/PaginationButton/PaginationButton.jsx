import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 재사용O
function PaginationButton({ pageNum, to, isActive }) {
  return (
    <Styled.Root to={to} isActive={isActive}>
      {pageNum}
    </Styled.Root>
  );
}

const Styled = {
  Root: styled(Link)`
    width: 50px;
    height: 50px;
    text-decoration: none;
    color: ${({ isActive, theme }) =>
      isActive ? theme.colors.white : theme.colors.black_02};
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
    background-color: ${({ isActive, theme }) =>
      isActive ? theme.colors.cyon_02 : 'transparent'};
    border: none;
    cursor: pointer;

    :hover {
      background-color: ${({ theme }) => theme.colors.cyon_02};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
};

export default PaginationButton;

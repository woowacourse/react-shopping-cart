import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 재사용O
function PaginationButton({ pageNum, to }) {
  return <Styled.Root to={to}>{pageNum}</Styled.Root>;
}

const Styled = {
  Root: styled(Link)`
    width: 50px;
    height: 50px;
    text-decoration: none;
    color: inherit;
    font-size: 18px;
    text-align: center;
    line-height: 50px;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    :hover {
      background-color: ${({ theme }) => theme.colors.cyon_02};
      color: ${({ theme }) => theme.colors.white};
    }
  `,
};

export default PaginationButton;

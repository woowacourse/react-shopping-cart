import styled from 'styled-components';

const PaginationButton = styled.button`
  width: 50px;
  height: 50px;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  border-radius: 4px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.cyon};
    // FIXME: theme 사용
    color: white;
  }
`;

export default PaginationButton;

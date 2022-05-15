import { Link } from "react-router-dom";
import styled from "styled-components";

const PaginationButton = styled(Link)`
  width: 50px;
  height: 50px;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  border-radius: 4px;
  background-color: transparent;
  text-decoration: none;
  border: none;
  color: ${({ theme }) => theme.colors["black_03"]};
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.colors.cyon};
    color: white;
  }
`;

export default PaginationButton;

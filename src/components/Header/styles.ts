import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 60px;
  background: ${({ theme }) => theme.colors.TEAL_400};
  box-shadow: 0px 4px 4px ${({ theme }) => theme.colors.GRAY_300};
  margin-bottom: 60px;
`;

const HeaderTitle = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 40px;
  text-decoration: none;

  & img {
    width: 40px;
    height: 36px;
  }

  & h1 {
    padding: 10px 0 0 10px;
    font-size: 30px;
    font-weight: 900;
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.colors.GRAY_50};
  }
`;

const HeaderMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  font-weight: 500;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.GRAY_50};

  & a {
    text-decoration: none;
    color: inherit;
  }
`;

export { HeaderWrapper, HeaderTitle, HeaderMenu };

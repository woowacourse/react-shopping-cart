import styled from "styled-components";

const Header = styled.header`
  width: 100%;
  height: 65px;
  display: flex;
  padding: 0 180px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cyon};
  justify-content: space-between;
`;

export default Header;

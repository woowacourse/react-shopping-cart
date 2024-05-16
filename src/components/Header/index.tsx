import styled from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>SHOP</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  background: black;
  align-items: center;
  display: flex;
  color: white;
  padding: 24px;
  box-sizing: border-box;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  line-height: 16px;
`;

import styled from '@emotion/styled';

const Root = styled.header`
  width: 100%;
  height: 80px;
  background-color: ${(props) => props.theme.bgColor.primary};
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 10;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1320px;
  min-width: 768px;
  height: 100%;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: 900;
`;

const Nav = styled.nav``;

const NavItem = styled.button`
  display: inline-block;
  height: 100%;
  padding: 0 22px;
  color: #ffffff;
  font-family: inherit;
  font-size: 24px;
  border: none;
  background: none;
  cursor: pointer;
`;

export default {
  Root,
  Container,
  Title,
  Nav,
  NavItem,
};

import styled from 'styled-components';

const HeaderTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: #333333;
`;

const DivisionLine = styled.hr`
  width: 1320px;
  height: 4px;
  margin-top: 29px;
  border: 0;
  background: #333333;
`;

function Header({ children }) {
  return (
    <header>
      <HeaderTitle>{children}</HeaderTitle>
      <DivisionLine />
    </header>
  );
}

export default Header;

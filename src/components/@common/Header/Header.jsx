import styled from 'styled-components';

const HeaderText = styled.h2`
  font-weight: 700;
  font-size: 32px;
  line-height: 37px;
  text-align: center;
  letter-spacing: 0.5px;
  color: var(--gray-900);
`;

const DivisionLine = styled.hr`
  width: 1320px;
  height: 4px;
  margin-top: 29px;
  border: 0;
  background: var(--gray-900);
`;

function Header({ children }) {
  return (
    <header>
      <HeaderText>{children}</HeaderText>
      <DivisionLine />
    </header>
  );
}

export default Header;

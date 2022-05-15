import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  height: 65px;
  margin-bottom: 40px;
  display: flex;
  padding: 0 180px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.cyon};
  justify-content: space-between;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
`;

export default Header;

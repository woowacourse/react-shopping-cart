import { styled } from 'styled-components';
import { HEADER_LOGO } from '../../../assets';
import { theme } from '../../../styles/theme';

const Header = () => {
  return (
    <Wrapper>
      <Logo src={HEADER_LOGO} alt="헤더 로고" />
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  /* justify-content: center; */
  align-items: center;

  position: fixed;
  top: 0;

  width: 100vw;
  height: 80px;

  padding: 0 300px 0 300px;

  background: ${theme.colors.primaryBlack};
`;

const Logo = styled.img``;

export default Header;

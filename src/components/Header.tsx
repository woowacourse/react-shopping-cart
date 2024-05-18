import ArrowBack from '@/assets/Arrow-Back.svg';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.svg';
import { THEME } from '@/style/theme';
import styled from '@emotion/styled';

type HeaderType = 'Logo' | 'ArrowBack';

interface Props {
  type?: HeaderType;
}

const Header = ({ type = 'Logo' }: Props) => {
  return (
    <StyledHeader>
      <Link to="/">
        <img src={type === 'Logo' ? Logo : ArrowBack} alt="" />
      </Link>
    </StyledHeader>
  );
};
export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${THEME.color.black};
  box-sizing: border-box;
  padding: 24px;
`;

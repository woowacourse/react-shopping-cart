import ArrowBack from '@/assets/Arrow-Back.svg';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.svg';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

type HeaderType = 'Logo' | 'ArrowBack';

interface Props {
  type?: HeaderType;
  navigatePath: string;
}

const Header = ({ type = 'Logo', navigatePath }: Props) => {
  return (
    <StyledHeader>
      <Link to={navigatePath}>
        <img
          src={type === 'Logo' ? Logo : ArrowBack}
          alt={type === 'Logo' ? 'Logo' : 'return'}
        />
      </Link>
    </StyledHeader>
  );
};
export default Header;

const StyledHeader = styled.header`
  width: 100%;
  height: 64px;
  background-color: ${theme.color.black};
  box-sizing: border-box;
  padding: 24px;
`;

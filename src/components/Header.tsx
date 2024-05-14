import ArrowBack from '@/assets/Arrow-back.png';
import { Link } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
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
  background-color: black;
  box-sizing: border-box;
  padding: 24px;
`;

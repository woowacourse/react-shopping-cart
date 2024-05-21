import styled, { css } from 'styled-components';
import { LogoIcon, BackArrowIcon } from '../../asset';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 3rem;
  background-color: #000000;
  width: 100%;
  height: 6.4rem;
`;

interface HeaderIconProps {
  $width: string;
}

const HeaderIcon = styled.img<HeaderIconProps>`
  ${(props) => css`
    width: ${props.$width};
    aspect-ratio: 1;
  `}
`;

interface HeaderProps {
  headerIconType: 'home' | 'back';
}

function Header({ headerIconType }: HeaderProps) {
  const handleHeaderIcon = ({ headerIconType }: HeaderProps) => {
    switch (headerIconType) {
      case 'back':
        return { icon: BackArrowIcon, width: '2.1rem', url: -1 };

      default:
        return { icon: LogoIcon, width: '5.6rem', url: '/' };
    }
  };

  const { icon, width, url } = handleHeaderIcon({ headerIconType });
  const navigate = useNavigate();

  const handleNavigate = (url: string | number) => {
    if (typeof url === 'number') {
      navigate(url);
    } else if (typeof url === 'string') {
      navigate(url);
    }
  };

  return (
    <HeaderContainer>
      <HeaderIcon
        $width={width}
        src={icon}
        onClick={() => {
          handleNavigate(url);
        }}
      />
    </HeaderContainer>
  );
}

export default Header;

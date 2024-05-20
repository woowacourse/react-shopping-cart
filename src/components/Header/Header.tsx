import * as Styled from './style';

interface HeaderProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Header = ({ children, onClick }: HeaderProps) => {
  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => onClick && onClick()}>
        {children}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

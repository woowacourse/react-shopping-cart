import * as Styled from './style';

interface HeaderProps {
  title: string;
  onClick?: () => void;
}

const Header = ({ title, onClick }: HeaderProps) => {
  return (
    <Styled.Header>
      <Styled.AppTitle onClick={() => onClick && onClick()}>
        {title}
      </Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

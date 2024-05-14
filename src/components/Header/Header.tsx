import * as Styled from './style';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  return (
    <Styled.Header>
      <Styled.AppTitle>{title}</Styled.AppTitle>
    </Styled.Header>
  );
};

export default Header;

import { StyledHeader } from 'components/header/style';

const Header = ({ left, right, ...rest }) => {
  return (
    <StyledHeader {...rest}>
      {left}
      {right}
    </StyledHeader>
  );
};

export default Header;

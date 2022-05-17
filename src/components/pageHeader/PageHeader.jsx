import { StyledHeader } from 'components/pageHeader/style';

const Header = ({ left, right, ...rest }) => {
  return (
    <StyledHeader {...rest}>
      {left}
      {right}
    </StyledHeader>
  );
};

export default Header;

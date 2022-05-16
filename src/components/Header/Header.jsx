import Styled from 'components/Header/style';

const Header = ({ left, right, ...rest }) => {
  return (
    <Styled.Header {...rest}>
      {left}
      {right}
    </Styled.Header>
  );
};

export default Header;

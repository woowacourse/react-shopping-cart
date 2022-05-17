import { BaseHeader } from './style';

const Header = ({ left, right, ...rest }) => {
  return (
    <BaseHeader {...rest}>
      {left}
      {right}
    </BaseHeader>
  );
};

export default Header;

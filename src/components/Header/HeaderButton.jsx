import styled, { css } from 'styled-components';
import Button from 'components/shared/button/Button';

const StyledButton = styled(Button)`
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 12px;

  ${props =>
    props.bold &&
    css`
      font-weight: 900;
      font-size: 40px;
      line-height: 58px;
    `}
`;

const HeaderButton = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default HeaderButton;

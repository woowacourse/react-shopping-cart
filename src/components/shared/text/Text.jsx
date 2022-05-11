import styled, { css } from 'styled-components';

const StyledText = styled.p`
  ${props =>
    props.modal &&
    css`
      font-weight: 500;
      font-size: 25px;
      color: var(--primary-color);
    `}
`;

const Text = ({ children, ...rest }) => {
  return <StyledText {...rest}>{children}</StyledText>;
};

export default Text;

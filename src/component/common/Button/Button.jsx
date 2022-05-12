import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

function Button({ onClick, children }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

Button.defaultProps = {
  onClick: () => {},
};

Button.propTypes = {
  onClick: PropTypes.func,
};

export default Button;

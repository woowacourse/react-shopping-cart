import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

function Button({ type, onClick, children }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  type: 'submit',
  onClick: () => {},
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;

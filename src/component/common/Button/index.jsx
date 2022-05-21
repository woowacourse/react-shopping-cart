import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Button({ type, onClick, children }) {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const StyledButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function Button({ type, onClick, children }) {
  return (
    <Styled.Button type={type} onClick={onClick}>
      {children}
    </Styled.Button>
  );
}

Button.defaultProps = {
  type: 'button',
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
};

const Styled = {
  Button: styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
  `,
};

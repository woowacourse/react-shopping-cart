import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Styled = {
  Button: styled.button`
    border: none;
    background: none;
    cursor: pointer;
  `,
};

export const CartButton = styled(Styled.Button)`
  :hover {
    svg path {
      fill: #2ac1bc;
    }
  }
`;

export const CardDetailButton = styled(Styled.Button)`
  width: 100%;
  height: 60px;
  background: #73675c;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  :hover {
    background: #2ac1bc;
  }
`;

const Button = ({ children }) => {
  return <Styled.Button>{children}</Styled.Button>;
};

Button.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Button;

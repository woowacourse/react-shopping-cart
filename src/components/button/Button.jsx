import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

export const BUTTON_TYPE = Object.freeze({
  LARGE: 'LARGE',
  MEDIUM: 'MEDIUM',
  SMALL: 'SMALL',
  X_SMALL: 'X_SMALL',
});

const buttonStyle = {
  LARGE: {
    width: '638px',
    height: '98px',
    fontSize: '32px',
    fontWeight: '500',
    backgroundColor: COLOR.BROWN_500,
    color: COLOR.WHITE,
  },
  MEDIUM: {
    width: '388px',
    height: '73px',
    fontSize: '24px',
    backgroundColor: COLOR.MINT_500,
    color: COLOR.WHITE,
  },
  SMALL: {
    width: '138px',
    height: '47px',
    fontSize: '20px',
    backgroundColor: COLOR.MINT_500,
    color: COLOR.WHITE,
  },
  X_SMALL: {
    width: '117px',
    height: '50px',
    backgroundColor: COLOR.WHITE,
    border: `1px solid ${COLOR.GRAY_300}`,
  },
};

// TODO Object.keys()로 할 필요가 있나? buttonStyle[type] ? buttonStyle[type] : buttonStyle['MEDIUM']하면 될 듯
const Container = styled.button`
  text-align: center;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};
  color: ${({ disabled }) => (disabled ? COLOR.GRAY_300 : 'inherit')};

  ${({ type }) => (Object.keys(BUTTON_TYPE).includes(type) ? buttonStyle[type] : buttonStyle['MEDIUM'])};
  ${({ styles }) => styles};
`;

const Button = ({ children, type, styles, disabled = false, onClick }) => (
  <Container type={type} styles={styles} disabled={disabled} onClick={onClick}>
    {children}
  </Container>
);

export default Button;

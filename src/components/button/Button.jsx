import React from 'react';
import styled from 'styled-components';
import { COLOR } from '../../constants/color';

export const TYPE = Object.freeze({
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

const StyledButton = styled.button`
  text-align: center;
  border: none;
  ${(props) => (Object.keys(TYPE).includes(props.type) ? buttonStyle[props.type] : buttonStyle['MEDIUM'])};
`;

const Button = ({ children, type }) => <StyledButton type={type}>{children}</StyledButton>;

export default Button;

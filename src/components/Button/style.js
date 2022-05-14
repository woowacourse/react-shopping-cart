import styled, { css } from 'styled-components';

export const buttonSize = {
  large: css`
    width: 380px;
    height: 58px;
    font-size: 22px;
  `,
  medium: css`
    width: 240px;
    height: 50px;
    font-size: 19px;
  `,
  small: css`
    width: 100px;
    height: 35px;
    font-size: 15px;
  `,
};

export const buttonColor = {
  primary: css`
    background-color: ${(props) => props.theme.RED_300};
  `,
  secondary: css`
    background-color: ${(props) => props.theme.GREY_500};
  `,
};

const Styled = {
  Button: styled.button`
    color: ${({ theme }) => theme.WHITE};
    border: none;
    cursor: pointer;
    ${({ sizeType }) => buttonSize[sizeType]}
    ${({ colorType }) => buttonColor[colorType]}
  `,
};

export default Styled;

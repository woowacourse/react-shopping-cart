import styled, {css} from 'styled-components';

const buttonTypes = {
  brownBackground: css`
    background-color: ${({theme}) => theme.COLOR.BROWN};
  `,
  mintBackground: css`
    background-color: ${({theme}) => theme.COLOR.MINT};
  `,
  grayBorder: css`
    border: ${({theme}) => `solid 1px ${theme.COLOR.GRAY_500}`};
    color: ${({theme}) => theme.COLOR.BLACK};
    font-size: ${({theme}) => theme.FONT_SIZE.XS};
  `,
};

const buttonSizeTypes = {
  s: css`
    width: 42px;
    height: 30px;
  `,
  m: css`
    width: 138px;
    height: 47px;
  `,
  l: css`
    width: 388px;
    height: 73px;
  `,
  xl: css`
    width: 638px;
    height: 98px;
  `,
};

const StyledButton = styled.button`
  color: ${(props) => props?.color || props.theme.COLOR.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.M};
  font-weight: 500;
  line-height: 12px;

  ${({buttonType}) => buttonTypes[buttonType]}
  ${({buttonSizeType}) => buttonSizeTypes[buttonSizeType]}

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  opacity: ${(props) => props.disabled && 0.2};
`;

export {buttonTypes, buttonSizeTypes, StyledButton};

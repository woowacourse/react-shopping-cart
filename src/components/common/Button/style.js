import styled, {css} from 'styled-components';

const buttonColor = {
  brown: css`
    background-color: ${({theme}) => theme.COLOR.BROWN};
  `,
  mint: css`
    background-color: ${({theme}) => theme.COLOR.MINT};
  `,
};

const StyledButton = styled.button`
  color: ${({theme}) => theme.COLOR.WHITE};
  font-size: ${({theme}) => theme.FONT_SIZE.M};
  font-weight: 500;
  line-height: 12px;

  ${({backgroundColor}) => buttonColor[backgroundColor]}

  width: ${(props) => props?.width};
  height: ${(props) => props?.height};

  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  opacity: ${(props) => props.disabled && 0.2};
`;

export {buttonColor, StyledButton};

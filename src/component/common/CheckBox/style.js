import {FlexColumn} from 'style/common';
import styled, {css} from 'styled-components';

const CheckBoxLayout = styled(FlexColumn)`
  min-width: 28px;
  max-width: 28px;
  min-height: 28px;
  max-height: 28px;

  justify-content: center;
  align-items: center;

  background-color: transparent;

  box-sizing: border-box;
  border: 1px solid ${({theme}) => theme.DARK_MINT};
  border-radius: 2px;

  ${(props) =>
    props.checked &&
    css`
      &::after {
        content: '✔';
      }
      color: ${({theme}) => theme.WHITE};
      background-color: ${({theme}) => theme.DARK_MINT};
    `}
`;

export {CheckBoxLayout};

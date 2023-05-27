import styled from 'styled-components';
import Colors from '../../../constants/Colors';

export const CheckboxInput = styled.input`
  display: none;
`;

export const CheckboxLabel = styled.label`
  display: inline-flex;

  width: 28px;
  height: 28px;

  border: 1px solid ${Colors.PRIMARY_COLOR_HIGHLIGHT};
  border-radius: 2px;
  cursor: pointer;

  ${CheckboxInput}:checked ~ & {
    background-color: ${Colors.PRIMARY_COLOR_DARK};
  }
`;

export const CheckSignDiv = styled.div`
  box-sizing: border-box;

  width: 18px;
  height: 10px;

  margin: 6px auto auto 4px;

  background: none;
  border: none;

  transform: rotate(-45deg);

  ${CheckboxInput}:checked ~ ${CheckboxLabel} > & {
    border-left: 3px solid ${Colors.FONT_WHITE};
    border-bottom: 3px solid ${Colors.FONT_WHITE};
  }
`;

export const LabelTextSpan = styled.span`
  display: inline-block;
  clip: rect(1px, 1px, 1px, 1px);

  border: 0;
  width: 1px;
  height: 1px;

  overflow: hidden;

  &::selection {
    color: ${Colors.PRIMARY_COLOR_DARK};
  }
`;

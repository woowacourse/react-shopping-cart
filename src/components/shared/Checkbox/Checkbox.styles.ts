import styled from '@emotion/styled';
import { InputHTMLAttributes } from 'react';

const CheckMark = styled.span`
  position: relative;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
  background-color: #ffffff;
  border: 1px solid ${(props) => props.theme.bgColor.primary};
  border-radius: 2px;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

const Text = styled.span`
  padding-left: 7px;
`;

const Checkbox = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:checked {
    & ~ ${CheckMark} {
      background-color: ${(props) => props.theme.bgColor.primary};
    }

    & ~ ${CheckMark}:after {
      display: block;
    }
  }

  &:disabled {
    & ~ ${CheckMark} {
      background-color: ${(props) => props.theme.bgColor.lightGrey};
      border-color: ${(props) => props.theme.borderColor.defaultGrey};
    }
  }
`;

type LabelProps = {
  disabled: InputHTMLAttributes<HTMLInputElement>['disabled'];
};

const Label = styled.label<LabelProps>`
  display: flex;
  position: relative;
  font-size: 16px;
  user-select: none;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};

  &:hover ${CheckMark} {
    background-color: #e1f5f4;
  }

  &:hover ${Checkbox}:disabled ~ ${CheckMark} {
    background-color: ${(props) => props.theme.bgColor.lightGrey};
  }
`;

export default {
  Label,
  Text,
  Checkbox,
  CheckMark,
};

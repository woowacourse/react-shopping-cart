import styled from "styled-components";
import { css } from "styled-components";

export const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  &:disabled {
    cursor: default;
  }
`;

export const CheckBoxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;

  ${({ disabled }) =>
    disabled &&
    css`
      font-size: large;
      cursor: default;
    `}
`;

export const CheckIcon = styled.div`
  display: inline-block;
  transform: rotate(45deg);
  height: 18px;
  width: 12px;
  border-bottom: 4px solid ${({ theme: { color } }) => color.main};
  border-right: 4px solid ${({ theme: { color } }) => color.main};
`;

export const CustomCheckBox = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;

  box-shadow: 0 0 0 1px ${({ theme: { color } }) => color.point};
  border-radius: 2px;
  text-align: center;

  ${CheckBoxInput}:checked + & {
    background-color: ${({ theme: { color } }) => color.point};
  }

  ${CheckBoxInput}:disabled + & {
    box-shadow: 0 0 0 1px ${({ theme: { color } }) => color.gray02};
    cursor: default;
  }

  ${CheckIcon} {
    visibility: ${({ checked }) => (checked ? "visible" : "hidden")};
  }
`;

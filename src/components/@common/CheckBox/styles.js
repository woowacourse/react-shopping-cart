import styled from '@emotion/styled';

import { COLORS } from 'styles/theme';

export const DefaultCheckBox = styled.input`
  display: none;
`;

export const CheckBoxStyle = styled.span`
  cursor: pointer;
  user-select: none;
  display: inline-block;
  min-width: 30px;
  max-width: 30px;
  height: 30px;
  line-height: 25px;
  margin-right: 10px;
  text-align: center;
  border: 2px solid ${COLORS.BROWN_100};
  border-radius: 5px;
  background-color: ${(props) => (props.isChecked ? COLORS.BROWN_100 : 'transparent')};
  color: ${COLORS.WHITE};

  &:hover {
    color: ${(props) => (props.isChecked ? COLORS.WHITE : COLORS.GRAY_200)};
    background-color: ${(props) => (props.isChecked ? COLORS.BROWN_200 : COLORS.GRAY_200)};
  }
`;

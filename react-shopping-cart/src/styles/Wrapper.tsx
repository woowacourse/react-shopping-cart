import styled, { FlexWrapper } from "styled-components";

export const RowFlexWrapper = styled.div<FlexWrapper>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  gap: ${({ gap }) => gap};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  border: ${({ border }) => border};
  border-color: ${({ bColor, theme }) => theme.colors[bColor]};
  border-top: ${({ bt, theme, bColor }) =>
    `${bt} solid ${theme.colors[bColor]}`};
  border-bottom: ${({ bb, theme, bColor }) =>
    `${bb} solid ${theme.colors[bColor]}`};
  border-left: ${({ bl, theme, bColor }) =>
    `${bl} solid ${theme.colors[bColor]}`};
  border-right: ${({ br, theme, bColor }) =>
    `${br} solid ${theme.colors[bColor]}`};
  padding: ${({ padding }) => padding};
`;

export const ColumnFlexWrapper = styled.div<FlexWrapper>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ gap }) => gap};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
  border-top: ${({ bt, theme, bColor }) =>
    `${bt} solid ${theme.colors[bColor]}`};
  border-bottom: ${({ bb, theme, bColor }) =>
    `${bb} solid ${theme.colors[bColor]}`};
  border-left: ${({ bl, theme, bColor }) =>
    `${bl} solid ${theme.colors[bColor]}`};
  border-right: ${({ br, theme, bColor }) =>
    `${br} solid ${theme.colors[bColor]}`};
  padding: ${({ padding }) => padding};
`;

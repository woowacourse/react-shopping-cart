import styled from 'styled-components';

export const RowFlexWrapper = styled.div`
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
`;

export const ColumnFlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
`;

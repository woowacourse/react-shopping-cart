import styled, { css } from 'styled-components';

interface DivisionProps {
  color: string;
  width?: string;
  margin?: string;
  height: string;
}

const StyledDivision = styled.div<DivisionProps>`
  ${({ color, width, margin, height }) => css`
    background-color: ${color};
    width: ${width || '100%'};
    margin: ${margin || '0'};
    height: ${height || '1px'};
  `}
`;

export default StyledDivision;

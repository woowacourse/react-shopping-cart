import styled, { css } from 'styled-components';

interface DivisionProps {
  color: string;
  width?: string;
  margin?: string;
  height: string;
}

const Division = ({ color, width, margin, height }: DivisionProps) => {
  return <StyledDivision color={color} width={width} margin={margin} height={height} />;
};

export default Division;

const StyledDivision = styled.div<DivisionProps>`
  ${({ color, width, margin, height }) => css`
    background-color: ${color};
    width: ${width || '100%'};
    margin: ${margin || '0'};
    height: ${height || '1px'};
  `}
`;

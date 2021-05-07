import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  ${({ width }) => width && `width: ${width};`}
  ${({ height }) => height && `height: ${height};`}
  ${({ margin }) => margin && `margin: ${margin};`}
  ${({ padding }) => padding && `padding: ${padding};`}
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor};`}
  ${({ border }) => border && `border: ${border};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
`;

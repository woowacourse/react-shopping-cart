import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  ${({ border }) => border && `border: ${border};`}
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ justifyContent }) => justifyContent && `justify-content: ${justifyContent};`}
`;

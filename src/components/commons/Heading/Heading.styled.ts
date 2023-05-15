import styled from 'styled-components';

export const StyledHeading = styled.h1<{
  fontSize: string;
  lineHeight: string;
}>`
  color: ${props => props.color};
  font-size: ${props => props.fontSize};
  text-align: center;
  line-height: ${props => props.lineHeight};
`;

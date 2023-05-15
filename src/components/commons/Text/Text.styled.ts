import styled from 'styled-components';

export const StyledText = styled.p<{
  fontStyle: string;
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
}>`
  color: ${props => props.color};

  font-family: 'Noto Sans KR';
  font-style: ${props => props.fontStyle};
  font-size: ${props => props.fontSize};
  font-weight: ${props => props.fontWeight};

  line-height: ${props => props.lineHeight};
`;

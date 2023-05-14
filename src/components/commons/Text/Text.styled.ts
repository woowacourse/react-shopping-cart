import styled from 'styled-components';

export const StyledText = styled.p<{ fontSize: string; lineHeight: string }>`
  color: ${props => props.color};

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-size: ${props => props.fontSize};
  font-weight: 500;
  line-height: ${props => props.lineHeight};
`;

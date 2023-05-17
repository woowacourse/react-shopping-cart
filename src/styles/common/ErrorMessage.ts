import styled from 'styled-components';

type ErrorMessageProps = {
  fontSize?: string;
  lineHeight?: string;
  textAlign?: string;
};

export const ErrorMessage = styled.p<ErrorMessageProps>`
  font-size: ${(props) => props.fontSize ?? '25px'};
  white-space: pre-wrap;
  line-height: ${(props) => props.lineHeight ?? '2'};
  text-align: ${(props) => props.textAlign ?? 'center'};
`;

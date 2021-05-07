import styled, { css } from 'styled-components';

interface Props {
  backgroundColor?: string;
}

export const TemplateContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  ${({ backgroundColor }) => backgroundColor && `background-color: ${backgroundColor}`};
`;

interface InnerTemplateContainerProps {
  width?: string;
}

const widthStyle = css<InnerTemplateContainerProps>`
  width: ${({ width }) => width};
  min-width: ${({ width }) => width};
`;

export const InnerTemplateContainer = styled.div<InnerTemplateContainerProps>`
  padding-top: 4rem;
  ${({ width }) => width && widthStyle}
`;

export const Title = styled.h2`
  display: block;
  border-bottom: 4px solid black;
  padding-bottom: 1.8rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

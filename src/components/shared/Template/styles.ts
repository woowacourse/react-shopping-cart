import styled from 'styled-components';

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

export const InnerTemplateContainer = styled.div<InnerTemplateContainerProps>`
  padding-top: 4rem;
  ${({ width }) => width && `width: ${width}`}
`;

export const Title = styled.h2`
  display: block;
  border-bottom: 4px solid black;
  padding-bottom: 1.8rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

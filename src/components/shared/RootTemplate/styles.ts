import styled from 'styled-components';
import { INNER_TEMPLATE_WIDTH } from '../../../constants/style';

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
  width: ${INNER_TEMPLATE_WIDTH};
  min-width: ${INNER_TEMPLATE_WIDTH};
`;

export const InnerTemplateTitle = styled.h2`
  display: block;
  border-bottom: 4px solid black;
  padding-bottom: 1.8rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

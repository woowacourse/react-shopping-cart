import styled from 'styled-components';
import { CommonContainer, CommonContent } from '../../commonStyle';

export const EmptyCartMessage = styled.p`
  ${(props) => props.theme.typography.content};
  color: ${(props) => props.theme.color.captionBlack};
`;

export const Container = CommonContainer;
export const Content = CommonContent;

import styled from 'styled-components';
import { CommonContainer, CommonContent } from '../../commonStyle';

export const Container = styled(CommonContainer)``;

export const Content = styled(CommonContent)``;

export const EmptyCartMessage = styled.p`
  ${(props) => props.theme.typography.content};
  color: ${(props) => props.theme.color.captionBlack};
`;

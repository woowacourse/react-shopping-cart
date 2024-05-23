import styled from 'styled-components';

export const Caption = styled.p`
  ${(props) => props.theme.typography.caption}
  color: ${(props) => props.theme.color.captionBlack};
`;

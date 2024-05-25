import styled from 'styled-components';

export const Caption = styled.p`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${(props) => props.theme.typography.caption}
  color: ${(props) => props.theme.color.captionBlack};
`;

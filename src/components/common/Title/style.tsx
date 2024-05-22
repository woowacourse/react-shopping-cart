import styled from 'styled-components';

export const TitleContainer = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Title = styled.h1`
  ${(props) => props.theme.typography.title}
  color: ${(props) => props.theme.color.black};
`;

export const Caption = styled.p`
  ${(props) => props.theme.typography.caption}
  color: ${(props) => props.theme.color.captionBlack};
`;

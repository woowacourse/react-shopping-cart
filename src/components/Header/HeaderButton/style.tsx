import emotionStyled from '@emotion/styled';

export const HomeButton = emotionStyled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacer.spacing2};
`;

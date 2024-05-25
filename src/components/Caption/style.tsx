import styled from 'styled-components';

export const Caption = styled.p<{ $isValid?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  ${(props) => props.theme.typography.caption}
  color: ${(props) =>
    props.$isValid
      ? props.theme.color.captionBlack
      : props.theme.color.borderGray};
`;

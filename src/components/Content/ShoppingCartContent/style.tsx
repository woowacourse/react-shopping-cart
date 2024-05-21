import styled from 'styled-components';

export const EmptyCartMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;
  ${(props) => props.theme.typography.content};
  color: ${(props) => props.theme.color.captionBlack};
`;

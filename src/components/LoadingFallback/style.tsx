import styled from 'styled-components';

export const LoadingMessage = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;

  text-align: center;
  ${(props) => props.theme.typography.title};
  color: ${(props) => props.theme.color.black};
`;

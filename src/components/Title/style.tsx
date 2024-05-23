import styled from 'styled-components';

export const Title = styled.h1`
  ${(props) => props.theme.typography.title}
  color: ${(props) => props.theme.color.black};
`;

import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70rem;
`;

export const Message = styled.p`
  ${props => props.theme.typography.label};
`;

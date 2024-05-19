import styled from 'styled-components';

export const Button = styled.button`
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
  border-radius: 0.4rem;
  background-color: ${props => props.theme.color.white};
  ${props => props.theme.typography.label};

  cursor: pointer;
`;

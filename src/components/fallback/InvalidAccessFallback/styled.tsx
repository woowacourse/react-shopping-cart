import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;

  width: 100%;
  height: 100%;
  margin-top: 10%;
  padding: 0 2rem;
`;

export const FailureIcon = styled.img`
  width: 20rem;
  height: 20rem;
`;

export const ErrorMessage = styled.h1`
  ${props => props.theme.typography.heading};
  color: ${props => props.theme.color.black};
  white-space: pre-line;
  text-align: center;
`;

export const BackButton = styled.button`
  width: 100%;
  max-width: 30rem;
  height: 4.4rem;

  border: none;
  background-color: ${props => props.theme.color.black};
  color: ${props => props.theme.color.white};
  ${props => props.theme.typography.boldLabel};
  cursor: pointer;
`;

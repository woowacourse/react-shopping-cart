import styled from 'styled-components';

export const Container = styled.article`
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
`;

export const Title = styled.h2`
  ${props => props.theme.typography.boldLabel};
`;

export const CheckBoxField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const CheckboxLabel = styled.p`
  padding-top: 0.5rem;
  ${props => props.theme.typography.label};
`;

import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 6rem;
`;

export const Info = styled.article`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const InfoText = styled.p`
  ${props => props.theme.typography.label};
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
`;

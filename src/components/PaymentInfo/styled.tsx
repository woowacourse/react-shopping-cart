import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70rem;
  gap: 2.4rem;
`;

export const Title = styled.p`
  ${props => props.theme.typography.pageTitle};
  text-align: center;
`;

export const ConfirmMessage = styled.p`
  ${props => props.theme.typography.label};
  white-space: pre-line;
  text-align: center;
`;

export const PriceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const PriceInfoTitle = styled.p`
  ${props => props.theme.typography.boldLabel};
  text-align: center;
`;

export const Price = styled.p`
  ${props => props.theme.typography.pageTitle};
  text-align: center;
`;

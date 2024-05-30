import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

export const ShippingTitle = styled.h2`
  ${props => props.theme.typography.boldLabel};
  margin-bottom: 1.6rem;
`;

export const ShippingCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
`;

export const ShippingDescription = styled.p`
  ${props => props.theme.typography.label};
`;

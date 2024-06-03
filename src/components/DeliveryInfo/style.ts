import styled from 'styled-components';

export const DeliveryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const DeliveryInfoTitle = styled.p`
  ${(props) => props.theme.typography.label}
`;

export const DeliveryCaption = styled.p`
  ${(props) => props.theme.typography.caption}
`;

export const DeliveryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

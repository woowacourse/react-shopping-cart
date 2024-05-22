import styled from 'styled-components';

export const Container = styled.hgroup`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const OrderInformationOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3.6rem 2.4rem;
  gap: 3.6rem;
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
`;

export const Price = styled.p`
  ${props => props.theme.typography.pageTitle};
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
`;

import styled from 'styled-components';

export const ShippingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.p`
  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.captionBlack}
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const SelectButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  border-radius: 8px;

  cursor: pointer;
`;

export const SelectMessage = styled.p`
  ${(props) => props.theme.typography.caption}
  color: ${(props) => props.theme.color.captionBlack};
`;

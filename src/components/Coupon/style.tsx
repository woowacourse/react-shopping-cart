import styled from 'styled-components';

export const Coupon = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SelectButtonText = styled.p`
  ${(props) => props.theme.typography.label}
  color: ${(props) => props.theme.color.black}
`;

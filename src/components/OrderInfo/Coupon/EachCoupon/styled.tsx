import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.2rem;
`;

export const Hr = styled.hr`
  width: 100%;
  height: 0.1rem;
  border: 0.1rem solid ${props => props.theme.color.black10};
`;

export const Header = styled.header`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

export const CouponTitle = styled.h3<{ $disabled: boolean }>`
  ${props => props.theme.typography.boldLabel};
  color: ${props => (props.$disabled ? props.theme.color.lightGray : props.theme.color.black)};
`;

export const Contents = styled.div<{ $disabled: boolean }>`
  margin-bottom: 1.2rem;
  color: ${props => (props.$disabled ? props.theme.color.lightGray : props.theme.color.black)};
`;

export const CouponCondition = styled.div`
  margin-bottom: 0.4rem;
  ${props => props.theme.typography.label};
`;

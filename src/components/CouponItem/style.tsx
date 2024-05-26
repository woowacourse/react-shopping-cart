import styled from '@emotion/styled';
import { CouponItemProps } from '.';

export const Wrapper = styled.div<Pick<CouponItemProps, 'disabled'>>`
  width: 318px;
  height: 82px;
  opacity: ${({ disabled }) => (disabled ? '25%' : 1)};

  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 12px 0;
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  gap: 8px;

  margin-bottom: 12px;
`;

export const Description = styled.label`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  text-align: left;
`;

export const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const Information = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
`;

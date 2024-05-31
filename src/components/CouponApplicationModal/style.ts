import styled from 'styled-components';
import { Divider } from '../../commonStyle';

export const CouponContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  margin-bottom: 2rem;
`;

export const CouponItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CouponItem = styled.button`
  background-color: white;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  cursor: pointer;
`;

export const CouponDivider = Divider;

export const CouponApplyButton = styled.button`
  width: 23.875rem;
  height: 3rem;
  border: 1px solid ${(props) => props.theme.color.borderGray};
  border-radius: 5px;
  color: #333333bf;
  font-size: 0.9375rem;
  background-color: ${(props) => props.theme.color.white};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.borderGray};
  }
`;

export const CouponDeleteButton = styled.button`
  width: 23.875rem;
  height: 3rem;
  border: 1px solid #333333;
  border-radius: 5px;
  color: ${(props) => props.theme.color.white};
  font-size: 0.9375rem;
  background-color: #333333;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.black};
  }
`;

export const CouponItemTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  p {
    ${(props) => props.theme.typography.label}
  }
`;

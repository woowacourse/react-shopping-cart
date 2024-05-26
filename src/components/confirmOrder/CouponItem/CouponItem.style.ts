import styled from '@emotion/styled';

export const CouponItemContainer = styled.li`
  border-top: 1px solid #e5e5e5;
  padding: 12px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CouponItemHeader = styled.div<{ isCheckable: boolean }>`
  height: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  color: ${(props) => (props.isCheckable ? '#000000' : '#bfbfbf')};
  font-size: 16px;
  font-weight: 700;
`;

export const CouponItemConditionList = styled.ul<{ isCheckable: boolean }>`
  color: ${(props) => (props.isCheckable ? '#0a0d13' : '#bfbfbf')};
  list-style: none;

  & > li {
    font-size: 12px;
    font-weight: 500;
    line-height: 19px;
  }
`;

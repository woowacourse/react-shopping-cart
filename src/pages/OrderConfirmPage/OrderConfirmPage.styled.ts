import styled from 'styled-components';

export const OrderConfirmTitle = styled.h1`
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
`;

export const OrderConfirmSubTitle = styled.p`
  padding-top: 2px;
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`;

export const CartInfoBanner = styled.p`
  padding: 32px 0px 12px 0px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CartInfoBannerText = styled.span`
  padding-top: 2px;
  color: rgba(10, 13, 19, 1);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;

export const LabelText = styled.span<{ $isDisabled?: boolean }>`
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  color: ${({ $isDisabled }) => ($isDisabled ? 'lightgray' : 'rgba(10, 13, 19, 1)')};
`;

export const HeadingText = styled.h1`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: rgba(10, 13, 19, 1);
`;

export const OrderDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 20px;
`;

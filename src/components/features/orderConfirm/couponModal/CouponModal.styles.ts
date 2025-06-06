import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  max-width: 400px;
  max-height: 614px;
  background: #fff;
  border-radius: 8px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
`;

export const CloseButton = styled.button``;

export const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NoticeText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;

export const CouponContainer = styled.div`
  width: 100%;
  height: 82px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CouponBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Name = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const DescriptionText = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;

export const Button = styled.button`
  width: 330px;
  height: 44px;
  background-color: #333333;
  color: white;
`;

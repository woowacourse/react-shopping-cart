import styled from "@emotion/styled";

export const CouponModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

export const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const CouponItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  min-height: 0;
`;

export const ApplyCouponButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 700;
  flex-shrink: 0;

  &:hover {
    transform: scale(0.995);
    background-color: rgb(35, 35, 35);
  }

  &:disabled {
    background-color: rgb(208, 208, 208);
    cursor: default;
  }
`;

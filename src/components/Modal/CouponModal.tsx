import styled from '@emotion/styled';
import { infoIcon } from '../../assets/index';
import CouponList from '../Coupon/CouponList';
import { useOrder } from '../../context/OrderContext';
import { useCoupon } from '../../context/CouponContext';
import { MAX_COUPON_COUNT } from '../../constants/coupon';

function CouponModal() {
  const { toggleModal } = useOrder();
  const { totalDiscount } = useCoupon();

  return (
    <ModalBackground>
      <Modal>
        <ModalHeader>
          <Title>쿠폰을 선택해 주세요</Title>
          <CloseButton onClick={toggleModal}>X</CloseButton>
        </ModalHeader>
        <CartInfo>
          <InfoIconImage src={infoIcon} alt="infoIcon" />
          <p>쿠폰은 최대 {MAX_COUPON_COUNT}개까지 사용할 수 있습니다.</p>
        </CartInfo>
        <div>
          <CouponList />
        </div>
        <div>
          <CouponApplyButton onClick={toggleModal}>
            총 {totalDiscount.toLocaleString()}원 할인 쿠폰 사용하기
          </CouponApplyButton>
        </div>
      </Modal>
    </ModalBackground>
  );
}
export default CouponModal;

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
`;

const Modal = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: rgb(255, 255, 255);
  padding: 24px 32px;
  border-radius: 8px 8px 0 0;
  width: 100%;
  max-height: 80vh;
  position: absolute;
  bottom: 0px;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 13px;
`;

const InfoIconImage = styled.img`
  width: 13px;
  height: 13px;
`;

const CloseButton = styled.button`
  padding: 8px 0;
  border: none;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;

  &:focus {
    outline: 2px solid #007aff;
  }
`;

const CouponApplyButton = styled.button`
  width: 100%;
  padding: 11px 0;
  border-radius: 5px;
  background: #333;
  text-align: center;
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

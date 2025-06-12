import styled from '@emotion/styled';
import CloseIconButton from './CloseIconButton';
import { useCouponContext } from '../../contexts/CouponContext';
import CouponCard from '../CouponCard';
import { MAX_COUPON_AMOUNT } from '../../constants/config';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  deliveryPrice: number;
  discountPrice: number;
}

const CouponModal = ({ isOpen, handleClose, deliveryPrice, discountPrice }: ModalProps) => {
  const { coupons } = useCouponContext();

  return (
    isOpen && (
      <S.container data-testid="modal">
        <S.overlay data-testid="modal-overlay" onClick={handleClose} />
        <S.content>
          <CloseIconButton onClick={handleClose} />
          <S.title>쿠폰을 선택해 주세요</S.title>
          <S.infoContainer>
            <img src="./info.svg" />
            <p>쿠폰은 최대 {MAX_COUPON_AMOUNT}개까지 사용할 수 있습니다.</p>
          </S.infoContainer>
          <S.CouponContainer>
            {coupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon} deliveryPrice={deliveryPrice} />
            ))}
          </S.CouponContainer>
          <S.closeButton onClick={handleClose}>
            총 {discountPrice.toLocaleString()}원 할인 쿠폰 사용하기
          </S.closeButton>
        </S.content>
      </S.container>
    )
  );
};

export default CouponModal;

const S = {
  container: styled.div`
    position: relative;
    width: 100%;
    z-index: 100;
  `,

  overlay: styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.35);
  `,

  title: styled.div`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 24px;
  `,

  content: styled.div`
    background: #fff;
    position: fixed;
    width: 430px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    padding: 24px;
  `,

  infoContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 12px 0px;
  `,

  CouponContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
    & > * {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
  `,

  closeButton: styled.button`
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    background: #333;
    color: white;
    font-weight: bold;
    font-size: 16px;
    border: none;
    transition: 0.3s background;

    &:hover {
      background: #222;
    }
  `,
};

import { Modal } from '@pakxe/react-simple-modal';
import NoticeMessage from '../NoticeMessage/NoticeMessage';
import { MAX_COUPON_COUNT } from '../../constants/coupon';
import { useRecoilValue } from 'recoil';
import CouponItem from '../CouponItem/CouponItem';
import { discountPriceByCouponListState } from '../../recoil/price/discountPriceByCouponListState';
import useCouponList from '../../hooks/useCouponList';
import { Spacer } from '../common/Spacer/Spacer.style';

const CouponListModalMain = ({ close }: { close: () => void }) => {
  const { couponList } = useCouponList();
  const totalDiscount = useRecoilValue(discountPriceByCouponListState);
  const shippingNotiMessage = totalDiscount.shippingFee === 'free' ? '(무료 배송)' : '';

  return (
    <>
      <Modal.Body>
        <NoticeMessage message={`쿠폰은 최대 ${MAX_COUPON_COUNT}개까지 사용할 수 있습니다.`} />
        <Spacer height={14} />
        {couponList.map((coupon) => (
          <CouponItem {...coupon} />
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Modal.Button
          style={{ height: '44px', fontSize: '15px' }}
          text={`총 ${totalDiscount.price.toLocaleString('ko-KR')}원 ${shippingNotiMessage} 할인 쿠폰 사용하기`}
          fullWidth
          variants="normal"
          color="default"
          onClick={close}
        />
      </Modal.Footer>
    </>
  );
};

export default CouponListModalMain;

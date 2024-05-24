import { Coupon } from '@appTypes/orderConfirm';
import { UpsideDownExclamation } from '@assets/index';
import CouponListItem from '@components/orderConfirm/CouponListItem/CouponListItem';
import { calculateDiscountAmount } from '@domain/discount';
import { useConfirmCouponApplication } from '@hooks/orderConfirm/useConfirmCouponApplication/useConfirmCouponApplication';
import useOrderCosts from '@hooks/shoppingCart/useOrderCosts';
import { Modal } from '@jinyyy/simple-modal';
import { couponListAtom, selectedCouponListAtom } from '@recoil/orderConfirm/atoms';
import { selectedItemsSelector } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import * as Styled from './CouponSelectModal.styled';

interface CouponSelectModalProps {
  isOpen: boolean;
  onToggle: () => void;
}

const CouponSelectModal: React.FC<CouponSelectModalProps> = ({ isOpen, onToggle }) => {
  const [selectedCouponList, setSelectedCouponList] = useRecoilState(selectedCouponListAtom);
  const { orderPrice, shippingPrice } = useOrderCosts();
  const selectedCartItems = useRecoilValue(selectedItemsSelector);

  const [temporarySelectedCouponList, setTemporarySelectedCouponList] = useState<Coupon[]>(selectedCouponList);

  const temporarySelectedTotalCouponAmount = temporarySelectedCouponList.reduce(
    (acc, coupon) => calculateDiscountAmount({ coupon, shippingPrice, orderPrice, selectedCartItems }) + acc,
    0,
  );

  const selectedCount = temporarySelectedCouponList.length;

  const couponList = useRecoilValue(couponListAtom);

  const isApplicabilityCoupon = useConfirmCouponApplication();

  const onAddTemporarySelectedCouponList = (checked: boolean, coupon: Coupon) => {
    setTemporarySelectedCouponList((prevItemList) => {
      const isAlreadySelected = prevItemList.some((item) => item.id === coupon.id);

      if (!checked && isAlreadySelected) {
        return prevItemList.filter((item) => item.id !== coupon.id);
      }

      if (checked && !isAlreadySelected && prevItemList.length < 2) {
        return [...prevItemList, coupon];
      }

      return prevItemList;
    });
  };

  return (
    <Modal position="center" isOpen={isOpen} onToggle={onToggle}>
      <Modal.ModalHeader style={{ display: 'flex', alignItems: 'center' }} title="쿠폰을 선택해 주세요">
        <Modal.ModalCloseButton onClick={onToggle} />
      </Modal.ModalHeader>
      <Modal.ModalContent style={{ height: 'auto', padding: '16px 0px' }}>
        <Styled.Banner>
          <UpsideDownExclamation />
          <Styled.BannerText>쿠폰은 최대 2개까지 사용할 수 있습니다.</Styled.BannerText>
        </Styled.Banner>
        <>
          {couponList?.map((coupon) => (
            <CouponListItem
              key={coupon?.id}
              isActive={
                (selectedCount < 2 || temporarySelectedCouponList.some((tempCoupon) => tempCoupon.id === coupon.id)) &&
                isApplicabilityCoupon(coupon)
              }
              isChecked={temporarySelectedCouponList.some((selectedCoupon) => selectedCoupon?.id === coupon.id)}
              coupon={coupon}
              onAddTemporarySelectedCouponList={onAddTemporarySelectedCouponList}
            />
          ))}
        </>
      </Modal.ModalContent>
      <Modal.ModalFooter direction="row">
        <Modal.ModalButton
          onClick={() => {
            setSelectedCouponList([...temporarySelectedCouponList]);
            onToggle();
          }}
          color="primary"
        >
          {temporarySelectedTotalCouponAmount === 0
            ? '쿠폰 선택하기'
            : `총 ${formatKoreanCurrency(temporarySelectedTotalCouponAmount)} 할인 쿠폰 사용하기`}
        </Modal.ModalButton>
      </Modal.ModalFooter>
    </Modal>
  );
};

export default CouponSelectModal;

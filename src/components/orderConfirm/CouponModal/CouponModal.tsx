import { Coupon } from '@appTypes/shoppingCart';
import { CrossIcon } from '@assets/index';
import { InfoBanner } from '@components/common';
import { MAX_NUMBER_OF_COUPON } from '@constants/coupon';
import { useCouponFinder, useMaxDiscountCalculator, useModalTargetEl, usePreventScroll } from '@hooks/index';
import { maxDiscountAtom, selectedCouponsAtom } from '@recoil/shoppingCart';
import { formatKoreanCurrency } from '@utils/currency';
import { CenterModal, ModalContainer } from 'badahertz52-react-modules-components';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import CouponCard from '../CouponCard/CouponCard';

import * as Styled from './CouponModal.styled';

interface CouponModalProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  availableCoupons: Coupon[];
}

const CouponModal = ({ openModal, setOpenModal, availableCoupons }: CouponModalProps) => {
  const setMaxDiscount = useSetRecoilState(maxDiscountAtom);
  const [selectedCoupons, setSelectedCoupons] = useRecoilState(selectedCouponsAtom);

  const { getMaxDiscountAmount } = useMaxDiscountCalculator();
  const { modalTargetEl } = useModalTargetEl();
  const { getCoupon, getAllCoupons } = useCouponFinder();

  usePreventScroll({ targetEl: document.body as HTMLBodyElement, isPreventScroll: openModal });

  const [selectedCouponCodes, setSelectedCouponCodes] = useState<string[]>(
    selectedCoupons.map((coupon) => coupon.code),
  );
  const [discount, setDiscount] = useState<number>(0);

  const coupons = Object.values(getAllCoupons());
  const availableCouponCodes = availableCoupons.map((coupon) => coupon.code);

  const isCouponDisabled = (code: string) => {
    // 사용 불가한 쿠폰인 경우
    if (!availableCouponCodes.includes(code)) return true;
    // 이미 최대 사용 가능한 쿠폰 개수만큼 쿠폰을 선택했지만, 해당 쿠폰은 선택되지 않은 경우
    if (selectedCouponCodes.length >= MAX_NUMBER_OF_COUPON && !selectedCouponCodes.includes(code)) return true;

    return false;
  };

  /**
   * 쿠폰 선택 변경에 따른 변경될 selectedCouponCodes를 반환하는 함수
   * @param isChecked
   * @param code
   */
  const getNewSelectedCouponCodes = (isChecked: boolean, code: string) => {
    if (isChecked) return selectedCouponCodes?.includes(code) ? selectedCouponCodes : selectedCouponCodes.concat(code);

    return selectedCouponCodes.filter((i) => i !== code);
  };

  /**
   * 선택된 쿠폰에 따른 최대 할인 금액을 계산해, 로컬 상태인 discount를 업데이트하는 함수
   */
  const updateDiscount = (newSelectedCouponCodes: string[]) => {
    const selectedCoupons = newSelectedCouponCodes
      .map((code) => getCoupon(code))
      .filter((coupon): coupon is Coupon => coupon !== undefined);

    setDiscount(getMaxDiscountAmount(selectedCoupons));
  };

  /**
   * 쿠폰에 대한 체크 박스의 선택 여부를 변경 시, 실행되는 기능(selectedCouponCodes,discount)에 대한 핸들러
   * @param code :해당 체크 박스의 타켓인 쿠폰의 코드
   */
  const handleChangeChecked = (e: ChangeEvent<HTMLInputElement>, code: string) => {
    const isChecked = e.target.checked;

    const newSelectedCouponCodes = getNewSelectedCouponCodes(isChecked, code);
    setSelectedCouponCodes(newSelectedCouponCodes);
    updateDiscount(newSelectedCouponCodes);
  };

  /**
   * 쿠폰 모달에서 선택된 쿠폰을 바탕으로 selectedCoupons 상태를 업데이트하는 함수
   */
  const updateSelectedCoupons = () => {
    const selectedCoupons = availableCoupons.filter((coupon) => selectedCouponCodes.includes(coupon.code));
    setSelectedCoupons(selectedCoupons);
  };

  const handleClickApplyCoupons = () => {
    // 상태 업데이트
    setMaxDiscount(discount);
    updateSelectedCoupons();

    // 모달 닫기
    setOpenModal(false);
  };

  return (
    <>
      {modalTargetEl && (
        <CenterModal modalTargetEl={modalTargetEl} openModal={openModal} setOpenModal={setOpenModal}>
          <Styled.ModalHeader>
            <Styled.ModalTitle>쿠폰을 선택헤주세요.</Styled.ModalTitle>
            <ModalContainer.CloseButtonWrapper>
              <Styled.ModalCloseButton>
                <CrossIcon />
              </Styled.ModalCloseButton>
            </ModalContainer.CloseButtonWrapper>
          </Styled.ModalHeader>
          <InfoBanner>쿠폰은 최대 2개까지 사용할 수 있습니다.</InfoBanner>
          <Styled.CouponList>
            {coupons.map((coupon) => (
              <CouponCard
                key={coupon.code}
                coupon={coupon}
                isChecked={selectedCouponCodes.includes(coupon.code)}
                isDisabled={isCouponDisabled(coupon.code)}
                handleChangeChecked={handleChangeChecked}
              />
            ))}
          </Styled.CouponList>
          <Styled.ApplyCouponButton onClick={handleClickApplyCoupons}>
            총 {formatKoreanCurrency(discount)} 할인 쿠폰 사용하기
          </Styled.ApplyCouponButton>
        </CenterModal>
      )}
    </>
  );
};

export default CouponModal;

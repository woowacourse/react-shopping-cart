import { useEffect, useState } from "react";
import { getCouponList } from "../../../api/coupon/getCouponList";
import Close from "../../../assets/Close.png";
import Info from "../../../assets/Info.png";
import { useCouponListContext } from "../../../contexts/CouponContext";
import { useReceipt } from "../../../hooks/useReceipt";
import { CouponResponse } from "../../../types/Coupon";
import * as S from "./Modal.styles";
import CouponItem from "../Coupon/CouponItem/CouponItem";
import CartItemCheck from "../../../types/CartItemCheck";
import calculateDisableCoupon from "../../../utils/calculateDisableCoupon";
import { useErrorContext } from "../../../contexts/ErrorContext";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  selectedCartItemList: CartItemCheck[];
  shippingFee: number;
}

export default function Modal({
  isModalOpen,
  onClose,
  selectedCartItemList,
  shippingFee,
}: ModalProps) {
  const [couponIds, setCouponIds] = useState<CouponResponse["id"][]>([]);
  const { calculateDiscounts, selectedItems, allProductPrice } =
    useReceipt(selectedCartItemList);

  const { couponList, setCouponList, setCheckedCoupons } =
    useCouponListContext();

  const { handleErrorMessage } = useErrorContext();

  const now = new Date();

  useEffect(() => {
    (async () => {
      try {
        const list = await getCouponList();
        setCouponList(list);
      } catch (err: any) {
        handleErrorMessage("쿠폰 목록을 불러오지 못했습니다.");
      }
    })();
  }, [setCouponList, handleErrorMessage]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <S.ModalBackground isModalOpen={isModalOpen}>
        <S.ModalContainer>
          <S.ModalHeader>
            <S.ModalHeaderTitle>
              <p>쿠폰을 선택해 주세요</p>
            </S.ModalHeaderTitle>
            <S.ModalHeaderCloseImg src={Close} onClick={onClose} />
          </S.ModalHeader>
          <S.ModalBody>
            <S.Info>
              <S.InfoImg src={Info}></S.InfoImg>
              <S.InfoDescription>
                쿠폰은 최대 2개까지 사용할 수 있습니다.
              </S.InfoDescription>
            </S.Info>
            <S.CouponList>
              {couponList.map((coupon) => {
                const isDisabled = calculateDisableCoupon(coupon, {
                  couponIds,
                  allProductPrice,
                  shippingFee,
                  selectedItems,
                  now,
                });

                return (
                  <CouponItem
                    key={coupon.id}
                    coupon={coupon}
                    isChecked={couponIds.includes(coupon.id)}
                    isDisabled={isDisabled}
                    onToggle={() =>
                      setCouponIds((prev) =>
                        prev.includes(coupon.id)
                          ? prev.filter((id) => id !== coupon.id)
                          : [...prev, coupon.id]
                      )
                    }
                  />
                );
              })}
            </S.CouponList>
          </S.ModalBody>
          <S.ModalButton
            onClick={() => {
              setCheckedCoupons(couponIds);
              onClose();
            }}
          >
            총{" "}
            {calculateDiscounts(couponIds, shippingFee).toLocaleString("ko-KR")}
            원 할인 쿠폰 사용하기
          </S.ModalButton>
        </S.ModalContainer>
      </S.ModalBackground>
    </>
  );
}

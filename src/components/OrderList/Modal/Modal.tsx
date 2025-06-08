import { useEffect, useState } from "react";
import { fetchCouponList } from "../../../api/fetchCouponList";
import Close from "../../../assets/Close.png";
import Info from "../../../assets/Info.png";
import { useCouponListContext } from "../../../contexts/CouponContext";
import { useReceipt } from "../../../hooks/useReceipt";
import { CouponResponse } from "../../../types/Coupon";
import {
  formatAvailableTime,
  formatCurrency,
  formatDate,
} from "../../../utils/format";
import CheckBox from "../../common/CheckBox/CheckBox";
import Hr from "../../common/Hr/Hr";
import * as S from "./Modal.styles";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isModalOpen, onClose }: ModalProps) {
  const [couponIds, setCouponIds] = useState<CouponResponse["id"][]>([]);
  const { calculateDiscounts, selectedItems, shippingFee, allProductPrice } =
    useReceipt();

  const { couponList, setCouponList, setCheckedCoupons } =
    useCouponListContext();

  useEffect(() => {
    (async () => {
      try {
        const list = await fetchCouponList();
        setCouponList(list);
      } catch (err: any) {
        console.error("쿠폰 조회 중 오류 발생:", err);
      }
    })();
  }, [setCouponList]);

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
                const isChecked = couponIds.includes(coupon.id);
                const isDisabled = !isChecked && couponIds.length >= 2;

                return (
                  <S.Item key={coupon.id} disabled={isDisabled}>
                    <Hr />
                    <S.ItemTitleWrapper>
                      <CheckBox
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          setCouponIds((prev) =>
                            prev.includes(coupon.id)
                              ? prev.filter((id) => id !== coupon.id)
                              : [...prev, coupon.id]
                          )
                        }
                      />
                      <S.ItemTitle>{coupon.description}</S.ItemTitle>
                    </S.ItemTitleWrapper>
                    <S.ItemInfoWrapper>
                      <S.CouponInfo>
                        만료일: {formatDate(coupon.expirationDate)}
                      </S.CouponInfo>
                      {(coupon.discountType === "fixed" ||
                        coupon.discountType === "freeShipping") && (
                        <S.CouponInfo>
                          최소 주문 금액: {formatCurrency(coupon.minimumAmount)}
                        </S.CouponInfo>
                      )}
                      {coupon.discountType === "percentage" && (
                        <S.CouponInfo>
                          {formatAvailableTime(coupon.availableTime)}
                        </S.CouponInfo>
                      )}
                    </S.ItemInfoWrapper>
                  </S.Item>
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
            총 {calculateDiscounts(couponIds)}원 할인 쿠폰 사용하기
          </S.ModalButton>
        </S.ModalContainer>
      </S.ModalBackground>
    </>
  );
}

import { useEffect, useState } from "react";
import { fetchCouponList } from "../../../api/fetchCouponList";
import Close from "../../../assets/Close.png";
import Info from "../../../assets/Info.png";
import { useCouponListContext } from "../../../contexts/CouponContext";
import { useReceipt } from "../../../hooks/useReceipt";
import { CouponResponse } from "../../../types/Coupon";
import * as S from "./Modal.styles";
import CouponItem from "../Coupon/CouponItem";
import CartItemCheck from "../../../types/CartItemCheck";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  selectedCartItemList: CartItemCheck[];
}

function computeDisabled(
  coupon: CouponResponse,
  opts: {
    couponIds: number[];
    allProductPrice: number;
    shippingFee: number;
    selectedItems: { quantity: number }[];
    now: Date;
  }
) {
  const { couponIds, allProductPrice, shippingFee, selectedItems, now } = opts;
  const isChecked = couponIds.includes(coupon.id);

  if (!isChecked && couponIds.length >= 2) return true;

  if (
    (coupon.discountType === "fixed" ||
      coupon.discountType === "freeShipping") &&
    allProductPrice < coupon.minimumAmount
  )
    return true;

  if (coupon.discountType === "freeShipping" && shippingFee === 0) return true;

  if (
    coupon.discountType === "buyXgetY" &&
    !selectedItems.some(
      (item) => item.quantity >= coupon.buyQuantity + coupon.getQuantity
    )
  )
    return true;

  if (coupon.discountType === "percentage" && coupon.availableTime) {
    const [sh, sm] = coupon.availableTime.start.split(":").map(Number);
    const [eh, em] = coupon.availableTime.end.split(":").map(Number);
    const startTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      sh,
      sm
    );
    const endTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      eh,
      em
    );
    if (now < startTime || now > endTime) return true;
  }

  return false;
}

export default function Modal({
  isModalOpen,
  onClose,
  selectedCartItemList,
}: ModalProps) {
  const [couponIds, setCouponIds] = useState<CouponResponse["id"][]>([]);
  const { calculateDiscounts, selectedItems, shippingFee, allProductPrice } =
    useReceipt(selectedCartItemList);

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
  const now = new Date();

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
                const isDisabled = computeDisabled(coupon, {
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
            총 {calculateDiscounts(couponIds).toLocaleString("ko-KR")}원 할인
            쿠폰 사용하기
          </S.ModalButton>
        </S.ModalContainer>
      </S.ModalBackground>
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import Coupon from "../../components/Coupon/Coupon";
import CouponDetails from "../../components/Coupon/CouponDetails";
import CouponList from "../../components/CouponList/CouponList";
import Modal from "../../components/Modal/Modal";
import { CouponType } from "../../components/Coupon/types";
import { CouponDataType } from "../../types/response";
import useFetch from "../../hooks/useFetch";
import useCheckboxHandler from "../../hooks/checkbox/useCheckboxHandler";
import { getCoupons } from "../../api/coupon";
import { adaptCoupon } from "../../utils/dataAdapter";
import { DEFAULT_ERROR_MESSAGE } from "../../constants/errorMessage";
import { ModalContentContainer, RedeemInfo } from "./CouponModal.styles";

interface CouponModalProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function CouponModal({ openModal, setOpenModal }: CouponModalProps) {
  const [coupons, setCoupons] = useState<CouponType[]>([]);
  const { fetchData } = useFetch<CouponDataType[]>("coupons");
  const { toggleSelect, isSelected, isMaxSelected } = useCheckboxHandler(
    coupons,
    {
      maxSelectableCount: 2,
      enableAllSelectBox: false,
      autoSelectAll: false,
    }
  );
  const fetchCoupons = useCallback(
    () =>
      fetchData({
        apiCall: getCoupons,
        onSuccess: (data) => {
          if (data) {
            setCoupons(data.map((coupon) => adaptCoupon(coupon)));
          }
        },
        onError: (error) => {
          const errorMessage =
            error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
          alert(errorMessage);
        },
      }),
    [fetchData]
  );

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  return (
    <Modal
      title="쿠폰을 선택해 주세요"
      open={openModal}
      onClose={() => setOpenModal(false)}
      buttonLabel="총 6,000원 할인 쿠폰 사용하기"
      handleModalButtonClick={() => ""}
    >
      <section css={ModalContentContainer}>
        <aside css={RedeemInfo}>
          <img src="info.svg" alt="info 아이콘" />
          <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>
        </aside>
        <CouponList>
          {coupons.map((coupon) => {
            return (
              <Coupon
                key={coupon.id}
                coupon={coupon}
                toggleSelect={toggleSelect}
                isSelected={isSelected(coupon.id)}
                isMaxSelected={isMaxSelected()}
              >
                <CouponDetails coupon={coupon} />
              </Coupon>
            );
          })}
        </CouponList>
      </section>
    </Modal>
  );
}

export default CouponModal;

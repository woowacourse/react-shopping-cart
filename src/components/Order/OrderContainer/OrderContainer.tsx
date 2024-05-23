/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { COLOR_PALETTE } from "../../../colorPalette";
import { useCoupons } from "../../../hooks/useCoupons";
import Button from "../../common/Buttons/Button";
import Checkbox from "../../common/Buttons/Checkbox/Checkbox";
import {
  CouponGuideContainerStyle,
  CouponGuideStyle,
  CouponModalContainerStyle,
  OrderContainerStyle,
  ShippingOptionCheckboxStyle,
  ShippingOptionContainerStyle,
  ShippingOptionTitleStyle,
} from "./OrderContainer.style";
import OrderItemList from "./OrderItemList/OrderItemList";
import { Modal } from "fe-custom-modal";
import CouponItem from "../../CouponItem/CouponItem";
import { IoIosInformationCircleOutline } from "react-icons/io";

const OrderContainer = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { coupons } = useCoupons();

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const discountAmount = 6000;

  return (
    <div css={OrderContainerStyle}>
      <OrderItemList />
      <Button
        width="100%"
        height="48px"
        fontSize="15px"
        fontWeight="700"
        border={`1px solid ${COLOR_PALETTE.lightNormalGrey}`}
        onClick={() => handleModalOpen()}
      >
        쿠폰 적용
      </Button>
      {modalOpened && (
        <Modal
          modalPosition="center"
          modalSize={{ width: "90%", height: "fit-content" }}
          modalHeader={{
            title: { content: "쿠폰을 선택해 주세요", fontSize: "18px", position: "left" },
            closeButton: { display: true, onClose: () => handleModalClose() },
          }}
          modalContent={{
            children: (
              <div css={CouponModalContainerStyle}>
                <div css={CouponGuideContainerStyle}>
                  <IoIosInformationCircleOutline size={15} />
                  <div css={CouponGuideStyle}>쿠폰은 최대 2개까지 사용할 수 있습니다.</div>
                </div>
                {coupons.map((coupon: Coupon) => (
                  <CouponItem couponInfo={coupon} key={coupon.id} />
                ))}
              </div>
            ),
          }}
          modalFooter={{
            confirmButton: {
              content: `총 ${discountAmount}원 할인 쿠폰 사용하기`,
              onConfirm: () => {
                console.log("confirm");
                handleModalClose();
              },
            },
          }}
        />
      )}

      <div css={ShippingOptionContainerStyle}>
        <div css={ShippingOptionTitleStyle}>배송 정보</div>
        <div css={ShippingOptionCheckboxStyle}>
          <Checkbox isCheck={false} />
          <div>제주도 및 도서 산간 지역</div>
        </div>
      </div>
    </div>
  );
};

export default OrderContainer;

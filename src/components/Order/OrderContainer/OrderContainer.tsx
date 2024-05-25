/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { COLOR_PALETTE } from "../../../colorPalette";
import Button from "../../common/Buttons/Button";
import Checkbox from "../../common/Buttons/Checkbox/Checkbox";
import {
  OrderContainerStyle,
  ShippingOptionCheckboxStyle,
  ShippingOptionContainerStyle,
  ShippingOptionTitleStyle,
} from "./OrderContainer.style";
import OrderItemList from "./OrderItemList/OrderItemList";

import CouponModal from "../../common/CouponModal/CouponModal";
import { useRecoilState } from "recoil";
import { remoteAreaState } from "../../../store/atom/atoms";

const OrderContainer = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [isRemoteArea, setIsRemoteArea] = useRecoilState(remoteAreaState);

  const handleModalOpen = () => {
    setModalOpened(true);
  };

  const handleModalClose = () => {
    setModalOpened(false);
  };

  const handleRemoteAreaCheckboxClick = () => {
    setIsRemoteArea((prev) => !prev);
  };

  return (
    <div css={OrderContainerStyle}>
      <OrderItemList />
      <Button
        width="100%"
        height="48px"
        fontSize="15px"
        fontWeight="700"
        border={`1px solid ${COLOR_PALETTE.lightNormalGrey}`}
        onClick={handleModalOpen}
      >
        쿠폰 적용
      </Button>
      <div css={ShippingOptionContainerStyle}>
        <div css={ShippingOptionTitleStyle}>배송 정보</div>
        <div css={ShippingOptionCheckboxStyle}>
          <Checkbox isCheck={isRemoteArea} onClick={handleRemoteAreaCheckboxClick} />
          <div>제주도 및 도서 산간 지역</div>
        </div>
      </div>
      <CouponModal isOpen={modalOpened} modalClose={handleModalClose} />
    </div>
  );
};

export default OrderContainer;

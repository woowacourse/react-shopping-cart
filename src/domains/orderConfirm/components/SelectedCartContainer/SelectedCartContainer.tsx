import Button from "../../../../components/Button/Button";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { SelectedCartList } from "../SelectedCartList/SelectedCartList";
import {
  deliveryInfoText,
  extraDetailLayout,
  selectedCartContainerLayout,
  selectedDeliveryInfo,
} from "./SelectedCartContainer.style";

export function SelectedCartContainer({
  handleModalOpen,
  isExtraDeliveryArea,
  handleCheckBox,
}: {
  handleModalOpen: () => void;
  isExtraDeliveryArea: boolean;
  handleCheckBox: () => void;
}) {
  return (
    <section css={selectedCartContainerLayout}>
      <SelectedCartList />
      <Button onClick={handleModalOpen} style="ghost" size="full">
        쿠폰 적용
      </Button>
      <div css={selectedDeliveryInfo}>
        <p css={deliveryInfoText}>배송 정보</p>
        <div css={extraDetailLayout}>
          <CheckBox
            checked={isExtraDeliveryArea}
            dataTestId="extra-delivery-area"
            id="extra-delivery-area"
            onChange={handleCheckBox}
          />
          <label htmlFor="extra-delivery-area">제주도 및 도서 산간 지역</label>
        </div>
      </div>
    </section>
  );
}

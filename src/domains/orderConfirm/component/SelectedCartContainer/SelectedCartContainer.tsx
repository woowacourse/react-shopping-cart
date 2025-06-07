import { useState } from "react";
import Button from "../../../../components/Button/Button";
import { CheckBox } from "../../../../components/CheckBox/CheckBox";
import { SelectedCartList } from "../SelectedCartList/SelectedCartList";
import {
  deliveryInfoText,
  extraDetailLayout,
  selectedCartContainerLayout,
  selectedDeliveryInfo,
} from "./SelectedCartContainer.style";

export function SelectedCartContainer() {
  const [isExtraDeliveryArea, setIsExtraDeliveryArea] = useState(false);

  const handleCheckBox = () => {
    setIsExtraDeliveryArea((prev) => !prev);
  };

  return (
    <section css={selectedCartContainerLayout}>
      <SelectedCartList />
      <Button onClick={() => {}} style="ghost" size="full">
        쿠폰 적용
      </Button>
      <div css={selectedDeliveryInfo}>
        <p css={deliveryInfoText}>배송 정보</p>
        <div css={extraDetailLayout}>
          <CheckBox
            isChecked={isExtraDeliveryArea}
            dataTestId="select-all"
            id="select-all"
            handleCheckBox={handleCheckBox}
          />
          <label htmlFor="select-all">제주도 및 도서 산간 지역</label>
        </div>
      </div>
    </section>
  );
}

import { useRecoilState } from "recoil";
import { css } from "@emotion/css";

import { shippingCheckedAtom } from "../../recoil/atom/atom";
import { Button } from "../default";
import CheckIcon from "../../assets/CheckIcon.svg?react";

const ShippingInfo = () => {
  const [isShippingChecked, setIsShippingChecked] = useRecoilState(shippingCheckedAtom);

  const handleShippingChecked = () => {
    setIsShippingChecked((prev) => !prev);
  };

  return (
    <div className={shippingInfoCSS}>
      <div className={shippingTextCSS}>배송 정보</div>

      <div className={shippingCheckContainerCSS}>
        <Button
          variant={isShippingChecked ? "primary" : "secondary"}
          size="small"
          onClick={handleShippingChecked}
        >
          <CheckIcon fill={isShippingChecked ? "var(--grey-100)" : "var(--grey-200)"} />
        </Button>
        <span className={allCheckedTestCSS}>제주도 및 도서 산간 지역</span>
      </div>
    </div>
  );
};

export default ShippingInfo;

const shippingInfoCSS = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const shippingTextCSS = css`
  font: var(--cart-subtitle);
  color: var(--grey-400);
`;

const shippingCheckContainerCSS = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const allCheckedTestCSS = css`
  font: var(--cart-label);
  color: var(--grey-400);
`;

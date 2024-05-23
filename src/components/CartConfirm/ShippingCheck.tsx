import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';

import Checkbox from '../common/Checkbox';

export default function ShippingCheck() {
  const [checked, setChecked] = useState(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <div css={shippingCheckContainer}>
      <h3 css={shippingCheckTitle}>배송 정보</h3>
      <Checkbox
        onChange={onChangeHandler}
        checked={checked}
        id="shipping-checkbox"
        label="제주도 및 도서 산간 지역"
        labelHidden={false}
      />
    </div>
  );
}

const shippingCheckContainer = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const shippingCheckTitle = css`
  font-size: 16px;
  font-weight: 700;
  line-height: 16px;
  color: #0a0d13;
`;

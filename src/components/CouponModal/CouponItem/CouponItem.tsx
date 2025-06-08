import { Line } from '../../Common/Line/Line';
import { CheckBox } from '../../Common/CheckBox/CheckBox';
import {
  listLayout,
  checkBoxWrapper,
  labelText,
  descriptionTextBox,
  descriptionText,
} from './CounponItem.style';
import { css } from '@emotion/react';
import { Coupon } from '../../../types/coupon';

interface CouponItemProps {
  couponData: Coupon;
  isChecked: boolean;
  onChange: (id: string) => void;
}

export function CouponItem({
  couponData,
  isChecked,
  onChange,
}: CouponItemProps) {
  return (
    <li css={listLayout}>
      <Line />
      <div css={checkBoxWrapper}>
        <CheckBox
          customCss={css`
            width: 24px;
            height: 24px;
            margin: 0px;
          `}
          id={couponData.id.toString()}
          isChecked={isChecked}
          onChange={onChange}
          dataTestId={couponData.code}
        />
        <label htmlFor={couponData.code} css={labelText}>
          {couponData.description}
        </label>
      </div>
      <div css={descriptionTextBox}>
        <p css={descriptionText}>만료일: {couponData.expirationDate}</p>
        {couponData.minimumAmount ? (
          <p css={descriptionText}>
            최소 주문 금액: {couponData.minimumAmount.toLocaleString('ko')}원
          </p>
        ) : null}
        {couponData.availableTime ? (
          <p css={descriptionText}>사용 가능 시간: 오전 4시부터 7시까지</p>
        ) : null}
      </div>
    </li>
  );
}

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
import formatDate from '../../../utils/formatDate';
import getKoreanAmPm from '../../../utils/getKoreanAmPm';

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
  const getAvailableTimeText = (availableTime: {
    start: string;
    end: string;
  }) => {
    const { start, end } = availableTime;

    const [startH, startM] = start.split(':');
    const [endH, endM] = end.split(':');

    const startText = `${Number(startH)}시${
      startM === '00' ? '' : `${startM}분`
    }`;
    const endText = `${Number(endH)}시${endM === '00' ? '' : `${endM}분`}`;

    const startTimeZone = getKoreanAmPm(start);
    const endTimeZone =
      getKoreanAmPm(end) === startTimeZone ? '' : getKoreanAmPm(end);

    return `${startTimeZone} ${startText}부터 ${endTimeZone} ${endText}까지`;
  };

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
        <p css={descriptionText}>
          만료일: {formatDate(couponData.expirationDate)}
        </p>
        {couponData.minimumAmount ? (
          <p css={descriptionText}>
            최소 주문 금액: {couponData.minimumAmount.toLocaleString('ko')}원
          </p>
        ) : null}
        {couponData.availableTime ? (
          <p css={descriptionText}>
            사용 가능 시간: {getAvailableTimeText(couponData.availableTime)}
          </p>
        ) : null}
      </div>
    </li>
  );
}

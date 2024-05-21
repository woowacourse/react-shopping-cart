import { CouponData } from '@/types';
import CheckBox from '../common/CheckBox';
import common from '@/common.module.css';
import styles from './couponItem.module.css';
import formatKoreanCurrency from '@/utils/formatKoreanCurrency';
import formatStartToEndTime from '@/formatStartToEndTime';
import formatDateToKorea from '@/formatDateToKorea';
import Divider from '../common/Divider';

function formatExpirationDate(dateString: string) {
  const [year, month, day] = dateString.split('-').map(Number);

  return `${year}년 ${month}월 ${day}일`;
}

export default function CouponItem({
  id,
  code,
  description,
  discount,
  discountType,
  minimumAmount,
  buyQuantity,
  getQuantity,
  availableTime,
  expirationDate,
}: CouponData) {
  const formattedAvailableTime =
    availableTime && formatStartToEndTime(availableTime.start, availableTime.end);
  const formattedExpirationDate = formatDateToKorea(expirationDate);

  return (
    <Divider>
      <li className={styles.coupon_item_container}>
        <div className={styles.coupon_item_header}>
          <CheckBox id={`coupon-item${id}`} onChange={() => {}} checked={false} />
          <p className={`${common.title_text} ${styles.text}`}> {description}</p>
        </div>
        <div className={styles.coupon_info}>
          <span className={styles.info_text}>만료일: {formattedExpirationDate}</span>
          {minimumAmount ? (
            <span className={styles.info_text}>
              최소 주문 금액: {formatKoreanCurrency(minimumAmount)}원
            </span>
          ) : null}
          {formattedAvailableTime ? (
            <span className={styles.info_text}>사용 가능 시간: {formattedAvailableTime}</span>
          ) : null}
        </div>
      </li>
    </Divider>
  );
}

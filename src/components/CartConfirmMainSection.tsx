import { css } from '@emotion/react';
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CartFooterSection from './common/CartFooter';
import CartItem from './common/CartItem';

import { CHECKED, UNCHECKED } from '@/assets/images';
import { THEME } from '@/constants/theme';
import {
  checkedCartItemsState,
  orderResultState,
  productTypesCountState,
} from '@recoil/cartItems/selectors';

const CartConfirmMainSection = () => {
  const { totalQuantity } = useRecoilValue(orderResultState);
  const productTypesCount = useRecoilValue(productTypesCountState);
  const checkedCartItems = useRecoilValue(checkedCartItemsState);

  const [isAdditionalDelivery, setIsAdditionalDelivery] = useState(false);

  const handleClickAdditionalDelivery = (e: ChangeEvent<HTMLInputElement>) => {
    setIsAdditionalDelivery(e.target.checked);
  };

  return (
    <div css={container}>
      <section css={cartHeaderSection}>
        <div css={cartTitleWrapper}>
          <h2 css={cartTitle}>주문 확인</h2>
        </div>
        <div css={descriptionWrapper}>
          <span css={description}>
            총 {productTypesCount}종류의 상품 {totalQuantity}개를 주문합니다. <br />
            최종 결제 금액을 확인해주세요.
          </span>
        </div>
      </section>

      <div>
        {checkedCartItems.map((checkedCartItem) => (
          <CartItem key={checkedCartItem.id} item={checkedCartItem} type="ORDER" />
        ))}
      </div>
      {/* TODO: 쿠폰 할인 적용 값 recoil로 관리 */}
      <button css={couponButton}>쿠폰 적용</button>
      <div style={{ margin: '16px 0' }}>
        <span>배송 정보</span>
        <div>
          {/* TODO: 체크 박스 공통 컴포넌트로 분리 */}
          <input
            id="far-location"
            type="checkbox"
            checked={isAdditionalDelivery}
            css={screenReaderOnly}
            onChange={handleClickAdditionalDelivery}
          />
          <label css={label} htmlFor="far-location">
            <img src={isAdditionalDelivery ? CHECKED : UNCHECKED} css={checkIcon} />
            <span css={labelText}>제주도 및 도서 산간 지역</span>
          </label>
        </div>
      </div>
      <CartFooterSection type="ORDER" />
    </div>
  );
};

export default CartConfirmMainSection;

const container = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;

  padding: 0 24px;

  overflow-y: scroll;
`;

const cartHeaderSection = css`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;

  padding: 36px 0;
`;

const cartTitleWrapper = css`
  display: flex;
  align-items: center;

  height: 35px;
`;

const cartTitle = css`
  font-size: 24px;
  font-weight: 700;
`;

const descriptionWrapper = css`
  display: flex;
  align-items: center;
  width: 100%;
`;

const description = css`
  color: #0a0d13;

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;

const couponButton = css`
  border: 1px solid #33333340;
  border-radius: 10px;
  padding: 16px 0;

  background-color: ${THEME.WHITE};

  font-weight: 700;
  font-size: 15px;
  color: #333333bf;
`;

const screenReaderOnly = css`
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  border: 0;

  overflow: hidden;
  clip-path: inset(50%);
  clip: rect(0 0 0 0);
`;

const label = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const labelText = css`
  font-size: 12px;
  font-weight: 500;
`;

const checkIcon = css`
  width: 24px;
  height: 24px;

  cursor: pointer;
`;

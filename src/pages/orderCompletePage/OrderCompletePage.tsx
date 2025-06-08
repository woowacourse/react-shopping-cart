import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as S from './OrderCompletePage.styles';
import { Subtitle, Title } from '../../styles/@common/title/Title.styles';
import OrderItem from '../../components/features/orderItem/OrderItem';
import useCartData from '../../hooks/useCartData';
import Button from '../../components/@common/button/Button';
import Checkbox from '../../components/@common/checkbox/Checkbox';
import infoIcon from '/public/icon/ic_info.svg';
import { FREE_DELIVERY_MESSAGE } from '../../constants/systemMessages';
import { FEE } from '../../constants/systemConstants';

interface OrderCompleteState {
  productTypeCount: number;
  totalProductCount: number;
}

const OrderCompletePage = () => {
  const { state } = useLocation() as { state: OrderCompleteState };
  const { productTypeCount, totalProductCount } = state;
  const { cartData, fetchCartData } = useCartData();

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <section css={S.CartPageWrapper}>
      <div css={S.CartTitleContainer}>
        <p css={Title}>주문 확인</p>
        <p css={Subtitle}>
          총 {productTypeCount}종류의 상품 {totalProductCount}개를 주문합니다.
        </p>
        <p css={Subtitle}>최종 결제 금액을 확인해 주세요.</p>

        {cartData.map((item) => (
          <OrderItem key={item.id} cartData={item} />
        ))}

        <Button variant="coupon">쿠폰 적용</Button>
        <div css={S.DeliveryInfoContainer}>
          <p css={S.DeliveryInfoTitle}>배송 정보</p>
          <div css={S.DeliveryInfoCheckboxContainer}>
            <Checkbox checked={true} onChange={() => {}} />
            <p css={S.DeliveryDifficultArea}>제주도 및 도서 산간 지역</p>
          </div>
          <div css={S.InfoMessageContainer}>
            <img src={infoIcon} alt="info" />
            <p css={Subtitle}>{FREE_DELIVERY_MESSAGE}</p>
          </div>

          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>주문 금액</div>
            <div css={Title}>
              {/* {totalCartItemPrice > FEE.DELIVERY_FEE_STANDARD */}
              {/* ? FEE.DELIVERY_FEE_FREE */}
              {/* : FEE.DELIVERY_FEE.toLocaleString()} */}원
            </div>
          </div>
          {/* {totalCartItemPrice !== FEE.DELIVERY_FEE_FREE && ( */}
          <div css={S.CartPriceInfoContainer}>
            <div css={S.CartPriceSubtitle}>쿠폰 할인 금액</div>
            <div css={Title}>
              {/* {totalCartItemPrice > FEE.DELIVERY_FEE_STANDARD */}
              {/* ? FEE.DELIVERY_FEE_FREE */}
              {/* : FEE.DELIVERY_FEE.toLocaleString()} */}원
            </div>
          </div>
          {/* )} */}
        </div>
        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>배송비</div>
          {/* {totalCartItemPrice !== 0 && ( */}
          <div css={Title}>{/* {totalPrice.toLocaleString()} */}원</div>
          {/* )} */}
        </div>

        <div css={S.CartPriceInfoContainer}>
          <div css={S.CartPriceSubtitle}>총 결제 금액</div>
          {/* {totalCartItemPrice !== 0 && ( */}
          <div css={Title}>{/* {totalPrice.toLocaleString()} */}원</div>
          {/* )} */}
        </div>
      </div>
    </section>
  );
};

export default OrderCompletePage;

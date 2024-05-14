import Caution from '../../assets/caution.svg';
import {
  Notification,
  OrderPrice,
  PriceGroup,
} from './ProductTotalPriceList.style';

export default function ProductTotalPriceList() {
  return (
    <section className="product-total-price-list">
      <Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </span>
      </Notification>
      <OrderPrice>
        <PriceGroup>
          <span className="price-group_title">주문 금액</span>
          <span className="price-group_price">70,000원</span>
        </PriceGroup>
        <PriceGroup>
          <span className="price-group_title">배송비</span>
          <span className="price-group_price">3,000원</span>
        </PriceGroup>
      </OrderPrice>
      <OrderPrice>
        <PriceGroup>
          <span className="price-group_title">총 결제 금액</span>
          <span className="price-group_price">73,000원</span>
        </PriceGroup>
      </OrderPrice>
    </section>
  );
}

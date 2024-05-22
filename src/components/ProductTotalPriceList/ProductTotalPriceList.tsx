import Caution from '../../assets/caution.svg';
import {
  Notification,
  OrderPrice,
  PriceGroup,
} from './ProductTotalPriceList.style';

interface Props {
  priceList: PriceList;
  totalPrice: number;
}

export default function ProductTotalPriceList({
  priceList,
  totalPrice,
}: Props) {
  return (
    <section className="product-total-price-list">
      <Notification>
        <img className="notification-img" src={Caution} />
        <span className="notification-text">
          총 주문 금액이 100,000원 이상일 경우 무료 배송됩니다.
        </span>
      </Notification>
      <OrderPrice>
        {Object.values(priceList).map((item) => {
          return (
            <PriceGroup>
              <span className="price-group_title">{item[0]}</span>
              <span className="price-group_price">
                {item[1].toLocaleString('ko-kr')}원
              </span>
            </PriceGroup>
          );
        })}
      </OrderPrice>
      <OrderPrice>
        <PriceGroup>
          <span className="price-group_title">총 결제 금액</span>
          <span className="price-group_price">
            {totalPrice.toLocaleString('ko-kr')}원
          </span>
        </PriceGroup>
      </OrderPrice>
    </section>
  );
}

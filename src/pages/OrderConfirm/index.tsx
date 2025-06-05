import * as S from './index.styles';
import Header from '../../components/feature/CartSection/Header';
import {useSelectedItems} from '../../provider/cartItemsProvider';
import {calcOrderHistory} from '../../feature/calcOrderHistory';
import Card from '../../components/feature/CartSection/CartProducts/Card';
import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import PriceSection from '../../components/feature/CartSection/PriceSection';

const OrderConfirm = () => {
  const selectedItems = useSelectedItems();
  const {orderPrice, deliveryPrice, totalAmount, totalPrice} =
    calcOrderHistory(selectedItems);
  return (
    <S.Container>
      <S.Wrapper>
        <Header
          title="주문 확인"
          description={`총 ${selectedItems.length}종류의 상품 ${totalAmount}개를 주문합니다. 최종 결제 금액을 확인해 주세요.`}
        />
        <S.CartList>
          {selectedItems?.map((cartItem) => (
            <Card key={cartItem.id} cartItem={cartItem} interactive={false} />
          ))}
        </S.CartList>
        <Button title="쿠폰 적용" onClick={() => {}} />
        <S.Description>배송 정보</S.Description>
        <CheckBox
          label="제주도 및 도서 산간 지역"
          isChecked={true}
          onChange={() => {}}
        />
        <PriceSection
          orderPrice={orderPrice}
          deliveryPrice={deliveryPrice}
          totalPrice={totalPrice}
        />
      </S.Wrapper>
    </S.Container>
  );
};

export default OrderConfirm;

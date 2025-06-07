import * as S from './index.styles';
import Header from '../../components/feature/CartSection/Header';
import {useSelectedItems} from '../../provider/cartItemsProvider';
import {calcOrderHistory} from '../../feature/calcOrderPrice';
import Card from '../../components/feature/CartSection/CartProducts/Card';
import Button from '../../components/common/Button';
import CheckBox from '../../components/common/CheckBox';
import PriceSection from '../../components/feature/CartSection/PriceSection';
import {useState} from 'react';
import {Modal} from '@muffin2219/components';
import Coupon from '../../components/feature/ModalContent/Coupon';
import {css} from '@emotion/react';

const buttonStyle = css`
  padding: 24px 0;
  background-color: #000;
  color: #fff;
  font-weight: 700;
  font-size: 16px;
`;

const OrderConfirm = () => {
  const selectedItems = useSelectedItems();
  const {orderPrice, deliveryPrice, totalAmount, totalPrice} =
    calcOrderHistory(selectedItems);

  const [isOpen, setIsOpen] = useState(false);
  const [isAdditionalDelivery, setIsAdditionalDelivery] = useState(false);

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
        <Button title="쿠폰 적용" onClick={() => setIsOpen(true)} />
        <S.Description>배송 정보</S.Description>
        <CheckBox
          label="제주도 및 도서 산간 지역"
          isChecked={isAdditionalDelivery}
          onChange={() => {
            setIsAdditionalDelivery(!isAdditionalDelivery);
          }}
        />
        <PriceSection
          orderPrice={orderPrice}
          deliveryPrice={deliveryPrice}
          totalPrice={totalPrice}
        />
      </S.Wrapper>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Coupon />
      </Modal>
      <Button title="결제하기" css={buttonStyle} onClick={() => {}} />
    </S.Container>
  );
};

export default OrderConfirm;

import Header from '../../components/Header/Header';
import Text from '../../components/common/Text/Text';
import Button from '../../components/common/Button/Button';
import { useRecoilValue } from 'recoil';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import CartOrderFormPageLoader from './CartOrderFormPageLoader';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';
import styled from 'styled-components';
import Title from '../../components/common/Title/Title';
import { PriceTable } from '../../components/PriceTable/PriceTable';
import { totalCartPriceState } from '../../recoil/price/totalCartPriceState';
import { cartShippingFeeState } from '../../recoil/price/cartShippingFeeState';
import { finalCartPriceState } from '../../recoil/price/finalCartPriceState';
import { discountPriceByCouponListState } from '../../recoil/price/discountPriceByCouponListState';
import { totalCartItemQuantitySelector } from '../../recoil/cartItem/totalCartItemQuantityState';
import CartItem from '../../components/CartItem/CartItem';
import Checkbox from '../../components/common/Checkbox/Checkbox';
import { Modal } from '@pakxe/react-simple-modal';
import { useState } from 'react';
import CouponListModal from '../../components/Modal/CouponListModal';

// TODO: cartOrders 의 컴포넌트와 동일. 복붙으로 재사용하니 수정요망
const CartPageContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 50px 20px 80px 20px;
`;

const ShippingAreaForm = () => {
  return (
    <>
      <Text>배송 정보</Text>
      <Checkbox description="제주도 및 도서 산간 지역" />
    </>
  );
};

const CartOrderFormPage = () => {
  const cartItemList = useRecoilValue(cartItemListState);
  const selectedCartItemIdList = useRecoilValue(selectedCartItemIdListState);

  const selectedCartItemList = cartItemList.filter(({ cartItemId }) => selectedCartItemIdList.includes(cartItemId));
  const totalQuantity = useRecoilValue(totalCartItemQuantitySelector);

  const totalCartPrice = useRecoilValue(totalCartPriceState);
  const discountPrice = useRecoilValue(discountPriceByCouponListState);
  const shippingFee = useRecoilValue(cartShippingFeeState);
  const finalCartPrice = useRecoilValue(finalCartPriceState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header type="back" />
      <CartPageContainer>
        <Title
          title="주문 확인"
          description={`총 ${selectedCartItemList.length}종류의 상품 ${totalQuantity}개를 주문합니다. \n최종 결제 금액을 확인해주세요.`}
        />
        {selectedCartItemList.map((cartItem) => (
          <CartItem {...cartItem} />
        ))}
        <Button width="full" onClick={openModal}>
          쿠폰 적용
        </Button>
        <ShippingAreaForm />
        <PriceTable>
          <PriceTable.Row name="주문 금액" price={totalCartPrice} />
          <PriceTable.Row name="쿠폰 할인 금액" price={discountPrice.coupon} />
          <PriceTable.Row name="배송비" price={shippingFee} />
          <PriceTable.Row name="총 결제 금액" price={finalCartPrice} upperDivider />
        </PriceTable>
      </CartPageContainer>

      <Button
        color="primary"
        width="full"
        radius={0}
        size="l"
        style={{ position: 'fixed', bottom: '0', width: '100%', maxWidth: '768px' }}
        isDisabled
      >
        결제하기
      </Button>

      <CouponListModal isOpen={isModalOpen} close={closeModal} />
    </>
  );
};

export default CartOrderFormPage;

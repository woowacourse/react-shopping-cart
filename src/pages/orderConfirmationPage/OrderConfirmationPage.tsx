import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getCartItemCounts } from '../../api';
import { ConfirmButton } from '../../components/button/confirmButton/ConfirmButton';
import Header from '../../components/header/Header';
import { cartItemsCountState } from '../../recoil/atoms/atoms';
import {
  categoryCountState,
  totalPriceState,
} from '../../recoil/selector/selector';
import {
  StyledConfirmationPagePriceContainer,
  StyledConfirmationPage,
  StyledConfirmationPageDescription,
  StyledConfirmationPagePrice,
  StyledConfirmationPageSubTitle,
  StyledConfirmationPageTitle,
} from './OrderConfirmationPage.styled';

export const OrderConfirmationPage: React.FC = () => {
  const totalPrice = useRecoilValue(totalPriceState);
  const categoryCount = useRecoilValue(categoryCountState);
  const [cartItemsCount, setCartItemsCount] =
    useRecoilState(cartItemsCountState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { quantity } = await getCartItemCounts();
        setCartItemsCount(quantity);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <Header type='back' />
      <StyledConfirmationPage>
        <StyledConfirmationPageTitle>주문확인 </StyledConfirmationPageTitle>
        <StyledConfirmationPageDescription>
          <span>
            총 {categoryCount}종류의 상품 {cartItemsCount}개를 주문합니다.
          </span>
          <span> 최종 결제 금액을 확인해 주세요.</span>
        </StyledConfirmationPageDescription>
        <StyledConfirmationPagePriceContainer>
          <StyledConfirmationPageSubTitle>
            총 결제 금액
          </StyledConfirmationPageSubTitle>
          <StyledConfirmationPagePrice>
            {totalPrice.toLocaleString()}원
          </StyledConfirmationPagePrice>
        </StyledConfirmationPagePriceContainer>
      </StyledConfirmationPage>
      <ConfirmButton text='결제하기' backgroundColor='rgba(190, 190, 190, 1)' />
    </>
  );
};

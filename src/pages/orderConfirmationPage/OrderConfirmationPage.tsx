import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getCartItemCounts } from '../../api';
import { ConfirmButton } from '../../components/confirmButton/ConfirmButton';
import {
  cartErrorMessageState,
  cartItemsCountState,
} from '../../recoil/atoms/atoms';
import {
  selectedItemsCountState,
  selectedItemsTotalQuantityState,
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
import { ErrorAlertModal } from '../../components/errorAlertModal/ErrorAlertModal';
import { CART_MESSAGES, ORDER_MESSAGES } from '../../constants/cart';
import Header from '../../components/header/Header';

export const OrderConfirmationPage: React.FC = () => {
  const totalPrice = useRecoilValue(totalPriceState);
  const selectedItemsTotalQuantity = useRecoilValue(
    selectedItemsTotalQuantityState,
  );
  const selectedItemsCount = useRecoilValue(selectedItemsCountState);
  const setCartItemsCount = useSetRecoilState(cartItemsCountState);
  const [cartErrorMessage, setCartErrorMessage] = useRecoilState(
    cartErrorMessageState,
  );

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const { quantity } = await getCartItemCounts();
        setCartItemsCount(quantity);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
        setCartErrorMessage(CART_MESSAGES.ORDER_FAIL);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <Header type='back' />
      <StyledConfirmationPage>
        <StyledConfirmationPageTitle>주문확인</StyledConfirmationPageTitle>
        <StyledConfirmationPageDescription>
          <span>
            {ORDER_MESSAGES.ORDER_SUMMARY(
              selectedItemsCount,
              selectedItemsTotalQuantity,
            )}
          </span>
          <span>{ORDER_MESSAGES.FINAL_AMOUNT_CONFIRM}</span>
        </StyledConfirmationPageDescription>
        <StyledConfirmationPagePriceContainer>
          <StyledConfirmationPageSubTitle>
            {ORDER_MESSAGES.FINAL_AMOUNT}
          </StyledConfirmationPageSubTitle>
          <StyledConfirmationPagePrice>
            {totalPrice.toLocaleString()}원
          </StyledConfirmationPagePrice>
        </StyledConfirmationPagePriceContainer>
        {cartErrorMessage.length > 0 && (
          <ErrorAlertModal errorMessage={cartErrorMessage} />
        )}
      </StyledConfirmationPage>
      <ConfirmButton text='결제하기' disabled={true} />
    </>
  );
};

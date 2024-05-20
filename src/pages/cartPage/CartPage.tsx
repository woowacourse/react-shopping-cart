import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { getCartItems } from '../../api';
import { ConfirmButton } from '../../components/confirmButton/ConfirmButton';
import { CartContentSection } from '../../components/cartContentSection/CartContentSection';
import { CartHeader } from '../../components/cartHeader/CartHeader';
import Header from '../../components/header/Header';
import {
  cartErrorMessageState,
  cartItemsState,
} from '../../recoil/atoms/atoms';
import {
  categoryCountState,
  selectedItemsCountState,
} from '../../recoil/selector/selector';
import { StyledCartPage } from './CartPage.styled';
import { ErrorAlertModal } from '../../components/errorAlertModal/ErrorAlertModal';

export const CartPage: React.FC = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const categoryCount = useRecoilValue(categoryCountState);
  const selectedItemsCount = useRecoilValue(selectedItemsCountState);
  const [cartErrorMessage, setCartErrorMessage] = useRecoilState(
    cartErrorMessageState,
  );

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        if (error instanceof Error) {
          setCartErrorMessage('장바구니 항목을 불러오는 데 실패했습니다.');
          console.error('Failed to fetch cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [selectedItemsCount, categoryCount]);

  return (
    <>
      <Header type='shop' />
      <StyledCartPage>
        <CartHeader categoryCount={categoryCount} />
        <CartContentSection categoryCount={categoryCount} />
        {cartErrorMessage.length > 0 && (
          <ErrorAlertModal errorMessage={cartErrorMessage} />
        )}
      </StyledCartPage>
      <ConfirmButton text='주문 확인' disabled={selectedItemsCount < 1} />
    </>
  );
};

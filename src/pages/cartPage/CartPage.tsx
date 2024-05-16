import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getCartItems } from '../../api';
import { ConfirmButton } from '../../components/button/confirmButton/ConfirmButton';
import { CartContentSection } from '../../components/cartContentSection/CartContentSection';
import { CartHeader } from '../../components/cartHeader/CartHeader';
import Header from '../../components/header/Header';
import { cartItemsState } from '../../recoil/atoms/atoms';
import { categoryCountState } from '../../recoil/selector/selector';
import { StyledCartPage } from './CartPage.styled';

export const CartPage: React.FC = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const categoryCount = useRecoilValue(categoryCountState);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const items = await getCartItems();
        setCartItems(items);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const buttonBackgroundColor =
    categoryCount === 0 ? 'rgba(190, 190, 190, 1)' : 'rgba(0, 0, 0, 1)';

  return (
    <>
      <Header type='shop' />
      <StyledCartPage>
        <CartHeader categoryCount={categoryCount} />
        <CartContentSection categoryCount={categoryCount} />
      </StyledCartPage>
      <ConfirmButton text='주문 확인' backgroundColor={buttonBackgroundColor} />
    </>
  );
};
38;

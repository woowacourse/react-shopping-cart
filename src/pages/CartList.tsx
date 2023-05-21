import { useEffect } from 'react';
import { Typography as Title } from '../ui/Typography';
import * as Styled from './styles/CartList.styles';
import { CartItemContainer } from '../components/CartItemContainer';
import { CartTotalPriceContainer } from '../components/CartTotalPriceContainer';

export const CartList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/carts');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <Title size="28px" weight="600">
          장바구니
        </Title>
      </Styled.TitleWrapper>
      <Styled.CartInfoWrapper>
        <CartItemContainer />
        <CartTotalPriceContainer />
      </Styled.CartInfoWrapper>
    </Styled.Wrapper>
  );
};

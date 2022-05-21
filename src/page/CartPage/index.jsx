import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'page/CartPage/index.style';
import { Button } from 'components';
import CartProductItem from 'components/CartProductItem';
import Line from 'components/Line';
import CheckBox from 'components/CheckBox';
import TotalPrice from 'components/TotalPrice';

const CartPage = () => {
  const { products, shoppingCart } = useSelector(state => state.reducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    shoppingCart.forEach(item => {
      const target = products.find(product => product.id === item.id);

      total += item.quantity * target.price;
    });

    return total;
  }, [products, shoppingCart]);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  return (
    <Styled.CartPage>
      <Styled.Title>장바구니</Styled.Title>
      <Line height="4px" width="inherit" />
      <Styled.OrderSheet>
        <Styled.LeftSide>
          <Styled.SelectController>
            <Styled.CheckBoxContainer>
              <CheckBox /> 선택해제
            </Styled.CheckBoxContainer>
            <Button color="black" border="1px solid #BBBBBB" style={{ padding: '12px 22px' }}>
              상품삭제
            </Button>
          </Styled.SelectController>

          <Styled.ProductListTitle>든든배송 상품 ({shoppingCart.length}개)</Styled.ProductListTitle>
          <Styled.ProductList>
            {shoppingCart.map(({ id, quantity }) => (
              <CartProductItem key={id} id={id} quantity={quantity} />
            ))}
          </Styled.ProductList>
        </Styled.LeftSide>
        <Styled.RightSide>
          <TotalPrice
            title="결제예상금액"
            price={totalPrice}
            action={`주문하기(${shoppingCart.length}개)`}
          />
        </Styled.RightSide>
      </Styled.OrderSheet>
    </Styled.CartPage>
  );
};

export default CartPage;

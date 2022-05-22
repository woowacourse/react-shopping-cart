import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Styled from 'page/CartPage/index.style';
import { Button, Image } from 'components';
import CartProductItem from 'components/CartProductItem';
import CheckBox from 'components/CheckBox';
import TotalPrice from 'components/TotalPrice';
import store from 'store/store';
import {
  doAddProdcutToOrder,
  doDeleteProductFromCart,
  doInitializeOrder,
} from 'actions/actionCreator';
import empty from 'assets/empty.jpeg';

const CartPage = () => {
  const { products, shoppingCart, order } = useSelector(state => state.reducer);
  const [totalPrice, setTotalPrice] = useState(0);

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    order.forEach(productId => {
      const { price } = products.find(product => product.id === productId);
      const { quantity } = shoppingCart.find(product => product.id === productId);

      total += quantity * price;
    });

    return total;
  }, [products, shoppingCart, order]);

  const handleCheckboxClick = () => {
    if (shoppingCart.length === order.length) {
      store.dispatch(doInitializeOrder());
      return;
    }

    shoppingCart.forEach(product => {
      if (!order.some(productId => productId === product.id)) {
        store.dispatch(doAddProdcutToOrder({ id: product.id }));
      }
    });
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [calculateTotalPrice]);

  return (
    <Styled.CartPage>
      {shoppingCart.length > 0 ? (
        <>
          <Styled.Title>장바구니</Styled.Title>
          <Styled.Division />
          <Styled.OrderSheet>
            <Styled.LeftSide>
              <Styled.SelectController>
                <Styled.CheckBoxContainer>
                  <CheckBox
                    checked={shoppingCart.length === order.length}
                    handleChange={handleCheckboxClick}
                  />
                  선택해제
                </Styled.CheckBoxContainer>
                <Button
                  color="black"
                  border="1px solid #BBBBBB"
                  style={{ padding: '12px 22px' }}
                  onClick={() =>
                    order.forEach(productId =>
                      store.dispatch(doDeleteProductFromCart({ id: productId })),
                    )
                  }
                >
                  상품삭제
                </Button>
              </Styled.SelectController>

              <Styled.ProductListTitle>
                든든배송 상품 ({shoppingCart.length}개)
              </Styled.ProductListTitle>
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
                action={`주문하기(${order.length}개)`}
              />
            </Styled.RightSide>
          </Styled.OrderSheet>
        </>
      ) : (
        <Styled.Empty>
          <Image src={empty} alt="empty" size="500px" />
          장바구니가 비어있어요.
        </Styled.Empty>
      )}
    </Styled.CartPage>
  );
};

export default CartPage;

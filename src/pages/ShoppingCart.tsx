import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { CartItem } from '../components/CartItem';
import { Header } from '../components/Header';
import { OrderSummary } from '../components/OrderSummary';
import { Checkbox } from '../components/styled';
import { useCartState } from '../recoils/recoilCart';
import { useCheckedState } from '../recoils/recoilChecked';

export const ShoppingCart = () => {
  const [cart] = useCartState();
  const [checkedState, setCheckedState] = useCheckedState();
  const [totalProductPrice, setTotalProductPrice] = useState(0);

  useEffect(() => {
    if (cart === null) return;

    const totalProductPrice = cart.reduce((totalPrice, item) => {
      if (checkedState[item.id]) {
        return totalPrice + item.quantity * item.product.price;
      }

      return totalPrice;
    }, 0);

    setTotalProductPrice(totalProductPrice);
  }, [cart]);

  const onChangeAllCheckbox = () => {
    setCheckedState((prev) => {
      if (prev.all) setTotalProductPrice(0);
      else {
        setTotalProductPrice(cart.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0));
      }

      const a: any = {};
      for (const product of cart) {
        a[product.id] = !prev.all;
      }

      return {
        ...a,
        all: !prev.all,
      };
    });
  };

  return (
    <Style.Layout>
      <Header />
      <Style.ShoppingCart>
        <Style.PageTitle>장바구니</Style.PageTitle>
        <Style.CountOfCartItems>든든배송 상품 ({cart.length}개)</Style.CountOfCartItems>
        <Style.Content>
          <Style.CartItems>
            {cart.map(({ id }) => (
              <CartItem key={id} productId={id} setTotalProductPrice={setTotalProductPrice} />
            ))}
          </Style.CartItems>
          <OrderSummary totalProductPrice={totalProductPrice} />
        </Style.Content>
        <Style.SelectionActions>
          <Style.Checkbox
            type="checkbox"
            checked={checkedState.all}
            onChange={onChangeAllCheckbox}
          />
          <div>
            전체선택 ({Object.keys(checkedState).length - 1}/{cart.length})
          </div>
          <button>선택삭제</button>
        </Style.SelectionActions>
      </Style.ShoppingCart>
    </Style.Layout>
  );
};

const Style = {
  Layout: styled.div`
    width: 100%;

    padding-bottom: 45px;
  `,

  ShoppingCart: styled.div`
    width: 1320px;

    margin: auto;
  `,

  PageTitle: styled.div`
    text-align: center;

    margin-bottom: 16px;
    padding: 30px 0;

    font-size: 32px;
    font-weight: 700;

    border-bottom: 4px solid var(--grey-400);
  `,

  CountOfCartItems: styled.div`
    padding: 16px 0;
    font-size: '20px';
  `,

  Content: styled.main`
    display: flex;

    padding-right: 20px;

    justify-content: space-between;
  `,

  CartItems: styled.ul``,

  SelectionActions: styled.div`
    display: flex;
    align-items: center;

    column-gap: 15px;
  `,

  Checkbox: styled(Checkbox)``,
};

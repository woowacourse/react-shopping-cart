import { styled } from 'styled-components';
import { CartItem } from '../components/CartItem';
import Header from '../components/Header';
import { OrderSummary } from '../components/OrderSummary';
import { Checkbox } from '../components/styled';

const mock = [
  {
    id: 1,
    quantity: 5,
    product: {
      id: 1,
      price: 10000,
      name: '치킨',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/28/earth-11009__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
  {
    id: 2,
    quantity: 1,
    product: {
      id: 2,
      price: 20000,
      name: '피자',
      imageUrl: 'https://cdn.pixabay.com/photo/2011/12/13/14/30/mars-11012__480.jpg',
    },
  },
];

export const ShoppingCart = () => {
  return (
    <Style.Layout>
      <Header />
      <Style.ShoppingCart>
        <Style.PageTitle>장바구니</Style.PageTitle>
        <Style.CountOfCartItems>든든배송 상품 (3개)</Style.CountOfCartItems>
        <Style.Content>
          <Style.CartItems>
            {Object.values(mock).map(({ product, quantity }) => (
              <CartItem key={product.id} product={product} quantity={quantity} />
            ))}
          </Style.CartItems>
          <OrderSummary />
        </Style.Content>
        <Style.SelectionActions>
          <Style.Checkbox type="checkbox" />
          <div>전체선택 (2/3)</div>
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

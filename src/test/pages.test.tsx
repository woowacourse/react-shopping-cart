import firebase from 'firebase/app';
import '@testing-library/jest-dom/extend-expect';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import db from './mockData.json';
import { store } from '../redux/store';
import { ROUTE, SCHEMA } from '../constant';
import App from '../App';
import { ProductProps } from '../type';

jest.mock('firebase/app', () => {
  // eslint-disable-next-line global-require
  const firebasemock = require('firebase-mock');
  const mockauth = new firebasemock.MockAuthentication();
  const mockfirestore = new firebasemock.MockFirestore();
  return new firebasemock.MockFirebaseSdk(
    null,
    () => mockauth,
    () => mockfirestore
  );
});

describe('페이지 기능 테스트', () => {
  beforeAll(async () => {
    window.confirm = () => true;

    // firebase.firestore().autoFlush();
    db.productList.forEach((product: ProductProps, index: number) =>
      firebase.firestore().collection(SCHEMA.PRODUCT).doc(`${index}`).set(product)
    );

    firebase.firestore().collection(SCHEMA.SHOPPING_CART).doc('1').set({
      id: '1',
      productIdList: [],
    });
    firebase
      .firestore()
      .collection(SCHEMA.ORDER)
      .doc('1')
      .set({
        id: '1',
        orderedProductList: [
          {
            id: '1',
            amount: 1,
          },
        ],
      });
  });

  describe('상품 목록 기능 테스트', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTE.HOME]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
      });
    });

    it('상품 목록에서 장바구니 아이콘을 클릭하면, 장바구니에 상품이 추가된다.', async () => {
      await act(async () => {
        const shoppingCartButtonList = await waitFor(() =>
          screen.getAllByTestId('shopping-cart-icon')
        );
        const firstShoppingCartButton = shoppingCartButtonList[0];
        fireEvent.click(firstShoppingCartButton);

        const goShoppingCartButton = screen.getByText('장바구니 바로가기 >');
        expect(goShoppingCartButton).toBeInTheDocument();

        fireEvent.click(goShoppingCartButton);
      });
    });
  });

  describe('장바구니 기능 테스트', () => {
    let dom : any = null;

    beforeEach(async () => {
      await act(async () => {
        dom = render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTE.SHOPPING_CART]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
      });
    });

    it('장바구니에 상품이 추가되었는지 확인한다.', async () => {
      await act(async () => {
        const shoppingCartPageHeader = await waitFor(() =>
          screen.getByRole('heading', {
            name: /장바구니/i,
          })
        );
        expect(shoppingCartPageHeader).toBeInTheDocument();

        const shoppingCartItem = (
          await firebase.firestore().collection(SCHEMA.SHOPPING_CART).get()
        ).data;
        expect(Object.values(shoppingCartItem).length).toEqual(1);
      });
    });

    it('카운터 클릭 시 상품의 수량을 1단위로 변경할 수 있다.', async () => {
      await act(async () => {
        await waitFor(() =>
          screen.getByRole('heading', {
            name: /장바구니/i,
          })
        );

        const upButton = dom.container.querySelector(
          'div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > div > div:nth-child(1)'
        );
        fireEvent.click(upButton);
        expect(screen.getByRole('spinbutton').value).toEqual('2');

        const downButton = dom.container.querySelector(
          'div > div > div:nth-child(1) > div:nth-child(3) > div > div:nth-child(2) > div > div > div:nth-child(2)'
        );
        fireEvent.click(downButton);
        expect(screen.getByRole('spinbutton').value).toEqual('1');
      });
    });

    it('주문하기 버튼을 클릭하면, 주문/결제 페이지로 이동한다.', async () => {
      await act(async () => {
        await waitFor(() =>
          screen.getByRole('heading', {
            name: /장바구니/i,
          })
        );

        fireEvent.click(
          screen.getByRole('button', {
            name: /주문하기\(1개\)/i,
          })
        );

        screen.getByRole('heading', {
          name: /주문\/결제/i,
        });
      });
    });
  });

  describe('주문/결제 기능 테스트', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTE.ORDER_CHECKOUT]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
      });
    });

    it('주문/결제 페이지가 정상적으로 노출되는지 확인한다.', async () => {
      await act(async () => {
        await waitFor(() =>
          screen.getByRole('heading', {
            name: /주문\/결제/i,
          })
        );

        fireEvent.click(screen.getByText(/30,000원 결제하기/i));
      });
    });
  });

  describe('주문목록 기능 테스트', () => {
    beforeEach(async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={[ROUTE.ORDER_LIST]}>
              <App />
            </MemoryRouter>
          </Provider>
        );
      });
    });

    it('주문목록 페이지가 정상적으로 노출되는지 확인한다.', async () => {
      await act(async () => {
        await waitFor(() =>
          screen.getByRole('heading', {
            name: /주문 목록/i,
          })
        );
      });
    });
  });
});

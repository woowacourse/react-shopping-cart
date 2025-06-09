import { fireEvent, render, screen } from '@testing-library/react';
import { OrderConfirm } from '../src/pages/OrderConfirm/OrderConfirm';
import { MemoryRouter } from 'react-router-dom';
import { SELECTED_CART_ITEM_IDS } from '../src/utils/localStorage';
import { vi } from 'vitest';
import { Context } from '../src/components/Common/CartItemsProvider/CartItemsProvider';
import coupons from '../src/mocks/coupon.json';

vi.mock('./src/hooks/CartItemsContext', () => ({
  useCartItemsContext: () => ({
    cartItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 100,
          name: '아샷추',
          price: 3800,
        },
      },
    ],
  }),
}));

describe('OrderConfirmPage 페이지 테스트', () => {
  beforeEach(() => {
    localStorage.setItem(
      SELECTED_CART_ITEM_IDS,
      JSON.stringify(['13117', '13121'])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });
  it('주문 확인 안내 문구 테스트', () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/confirm',
          },
        ]}
      >
        <Context.Provider
          value={{
            cartItems: [
              {
                id: 13117,
                quantity: 7,
                product: {
                  id: 28,
                  name: '아샷추',
                  price: 3800,
                  imageUrl:
                    'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
                },
              },
              {
                id: 13121,
                quantity: 5,
                product: {
                  id: 137,
                  name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
                  price: 5000,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
                },
              },
              {
                id: 14795,
                quantity: 6,
                product: {
                  id: 152,
                  name: '[소반옥] 왕갈비탕 1kg',
                  price: 11900,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
                },
              },
            ],
            error: '',
            isLoading: false,
            isFetching: false,
            getCartItemData: vi.fn(),
            setError: vi.fn(),
          }}
        >
          <OrderConfirm />
        </Context.Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText('현재 2종류의 상품 12개를 주문합니다.')
    ).toBeInTheDocument();
  });

  it('쿠폰 목록 테스트', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          {
            pathname: '/confirm',
          },
        ]}
      >
        <Context.Provider
          value={{
            cartItems: [
              {
                id: 13117,
                quantity: 7,
                product: {
                  id: 28,
                  name: '아샷추',
                  price: 3800,
                  imageUrl:
                    'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
                },
              },
              {
                id: 13121,
                quantity: 5,
                product: {
                  id: 137,
                  name: '[빙그래] 요맘때 파인트 710mL 3종 (택1)',
                  price: 5000,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/73061aab-a2e2-443a-b0f9-f19b7110045e.jpg',
                },
              },
              {
                id: 14795,
                quantity: 6,
                product: {
                  id: 152,
                  name: '[소반옥] 왕갈비탕 1kg',
                  price: 11900,
                  imageUrl:
                    'https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/860123d3-be82-4c90-ae47-0b56e2869eca.jpg',
                },
              },
            ],
            error: '',
            isLoading: false,
            isFetching: false,
            getCartItemData: vi.fn(),
            setError: vi.fn(),
          }}
        >
          <OrderConfirm />
        </Context.Provider>
      </MemoryRouter>
    );

    const triggerButton = screen.getByText('쿠폰 적용');
    fireEvent.click(triggerButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    for (const coupon of coupons) {
      const couponText = await screen.findByText(coupon.description);
      expect(couponText).toBeInTheDocument();
    }
  });
});

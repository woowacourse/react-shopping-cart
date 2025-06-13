import { fireEvent, render, screen } from '@testing-library/react';
import { OrderConfirm } from '../src/pages/OrderConfirm/OrderConfirm';
import { MemoryRouter } from 'react-router-dom';
import { SELECTED_CART_ITEM_IDS } from '../src/utils/localStorage';
import { vi } from 'vitest';
import { Context } from '../src/components/Common/CartItemsProvider/CartItemsProvider';
import coupons from '../src/mocks/coupon.json';
import { CartItemTypes } from '../src/types/cartItem';

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

const renderComponent = ({ cartItems }: { cartItems: CartItemTypes[] }) => {
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
          cartItems,
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
};

const defaultCartItemsDummy = [
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
];

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
  it('주문 확인 페이지에 들어오면 주문할 상품의 종류와 상품 개수를 알려주는 문구가 나타난다.', () => {
    renderComponent({
      cartItems: defaultCartItemsDummy,
    });

    expect(
      screen.getByText('현재 2종류의 상품 12개를 주문합니다.')
    ).toBeInTheDocument();
  });

  it('쿠폰 적용 버튼을 클릭하면 목록이 나타난다.', async () => {
    renderComponent({
      cartItems: defaultCartItemsDummy,
    });
    const triggerButton = screen.getByText('쿠폰 적용');
    fireEvent.click(triggerButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    for (const coupon of coupons) {
      const couponText = await screen.findByText(coupon.description);
      expect(couponText).toBeInTheDocument();
    }
  });

  it('쿠폰을 선택하면 사용하기 버튼의 가격이 변경된다.', async () => {
    renderComponent({
      cartItems: defaultCartItemsDummy,
    });

    const prevTotalPrice = screen.getByTestId('totalPrice');
    expect(prevTotalPrice).toHaveTextContent('54,600원');

    const triggerButton = screen.getByText('쿠폰 적용');
    fireEvent.click(triggerButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    const buyXgetYInput = await screen.findByText('2개 구매 시 1개 무료 쿠폰');
    fireEvent.click(buyXgetYInput);

    const button = screen.getByText('총 7,600원 할인 쿠폰 사용하기');
    expect(button).toBeInTheDocument();
  });

  it('쿠폰을 선택하면 사용하고 버튼을 누르면 쿠폰 할인 금액과 총 결제 금액이 변경된다.', async () => {
    renderComponent({
      cartItems: defaultCartItemsDummy,
    });

    const prevTotalPrice = screen.getByTestId('totalPrice');
    expect(prevTotalPrice).toHaveTextContent('54,600원');

    const triggerButton = screen.getByText('쿠폰 적용');
    fireEvent.click(triggerButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    const buyXgetYInput = await screen.findByText('2개 구매 시 1개 무료 쿠폰');
    fireEvent.click(buyXgetYInput);

    const useButton = screen.getByText('총 7,600원 할인 쿠폰 사용하기');
    fireEvent.click(useButton);

    const CouponDiscountAmount = screen.getByTestId('CouponDiscountAmount');
    expect(CouponDiscountAmount).toHaveTextContent('-7,600원');
  });

  it('배송비 무료 쿠폰을 선택하고 사용하기 버튼을 누르면 배송비가 0원이 된다.', async () => {
    renderComponent({
      cartItems: defaultCartItemsDummy,
    });

    const prevDeliveryFee = screen.getByTestId('deliveryFee');
    expect(prevDeliveryFee).toHaveTextContent('3,000원');

    const triggerButton = screen.getByText('쿠폰 적용');
    fireEvent.click(triggerButton);

    expect(screen.getByText('쿠폰을 선택해 주세요')).toBeInTheDocument();

    const freeDeliveryInput = await screen.findByText(
      '5만원 이상 구매 시 무료 배송 쿠폰'
    );
    fireEvent.click(freeDeliveryInput);

    const deliveryFee = screen.getByTestId('deliveryFee');
    expect(deliveryFee).toHaveTextContent('3,000원');
  });
});

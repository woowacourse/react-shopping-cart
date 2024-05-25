import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import CartItemWithControl from './CartItemWithControl';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { cartItemQuantityState } from '../../../recoil/cartItem/cartItemQuantityState';
import { act } from 'react';
import '@testing-library/jest-dom';
import { mockCartItemList } from '../../../mocks/cartItemList';
import { useCartItemList } from '../../../recoil/cartItemList/useCartItemList';

jest.mock('../../apis/requests/cartItemList', () => ({
  requestCartItemList: jest.fn().mockImplementation(() => mockCartItemList),
  requestSetCartItemQuantity: jest.fn(),
}));

const cartItemDummyData = {
  quantity: 10,
  product: {
    id: 11,
    name: '리복',
    price: 20000,
    imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
    category: 'fashion',
  },
  cartItemId: 1,
};

describe('CartItemWithControl 컴포넌트의 상품 개수 증감 테스트', () => {
  const QuantityChecker = ({ cartItemId }: { cartItemId: number }) => {
    const quantity = useRecoilValue(cartItemQuantityState(cartItemId));
    return <span data-testid="quantity-value">{quantity}</span>;
  };

  const initializeState = (cartItemId: number) =>
    renderHook(() => useCartItemList(), {
      wrapper: ({ children }) => (
        <RecoilRoot>
          <CartItemWithControl {...cartItemDummyData} />
          <QuantityChecker cartItemId={cartItemId} />
          {children}
        </RecoilRoot>
      ),
    });

  it('수량 증가 버튼을 누르면 수량이 1 증가된다.', async () => {
    const { result } = initializeState(cartItemDummyData.cartItemId);

    await act(() => result.current.updateCartItemList());

    // 이전 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe(cartItemDummyData.quantity.toString());

    // 수량 증가 버튼 클릭
    const increaseButton = screen.getByAltText('수량 증가');
    await waitFor(() => fireEvent.click(increaseButton));

    // 이후 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe((cartItemDummyData.quantity + 1).toString());
  });

  it('수량 감소 버튼을 누르면 수량이 1 감소된다.', async () => {
    const { result } = initializeState(cartItemDummyData.cartItemId);

    await act(() => result.current.updateCartItemList());

    // 이전 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe(cartItemDummyData.quantity.toString());

    // 수량 증가 버튼 클릭
    const increaseButton = screen.getByAltText('수량 감소');
    await waitFor(() => fireEvent.click(increaseButton));

    // 이후 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe((cartItemDummyData.quantity - 1).toString());
  });
});

describe('CartItemWithControl 컴포넌트에서 장바구니 항목 선택 테스트', () => {
  const QuantityChecker = ({ cartItemId }: { cartItemId: number }) => {
    const quantity = useRecoilValue(cartItemQuantityState(cartItemId));
    return <span data-testid="quantity-value">{quantity}</span>;
  };

  const renderCartItem = ({ cartItemId }: { cartItemId: number }) => {
    return render(
      <RecoilRoot>
        <CartItemWithControl {...cartItemDummyData} />
        <QuantityChecker cartItemId={cartItemId} />
      </RecoilRoot>,
    );
  };

  it('장바구니 항목의 선택 input을 누르면 토글된다.', async () => {
    renderCartItem({ cartItemId: cartItemDummyData.cartItemId });
    // screen.debug(); // 콘솔에 DOM 출력

    const checkButton = screen.getAllByAltText('Checkbox')[0];

    await waitFor(async () => fireEvent.click(checkButton));
    expect(checkButton).toBeChecked();

    await act(async () => fireEvent.click(checkButton));
    expect(checkButton).not.toBeChecked();
  });
});

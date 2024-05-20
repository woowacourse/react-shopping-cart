import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CartItem from './CartItem';
import { RecoilRoot, useRecoilValue } from 'recoil';
import { cartItemQuantityAtomFamily } from '../../recoil/cartItem/states';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('../../apis/cartItemList/cartItemList', () => ({
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

describe('CartItem 컴포넌트의 상품 개수 증감 테스트', () => {
  const QuantityChecker = ({ cartItemId }: { cartItemId: number }) => {
    const quantity = useRecoilValue(cartItemQuantityAtomFamily(cartItemId));
    return <span data-testid="quantity-value">{quantity}</span>;
  };

  const renderCartItem = ({ cartItemId }: { cartItemId: number }) => {
    return render(
      <RecoilRoot>
        <CartItem {...cartItemDummyData} />
        <QuantityChecker cartItemId={cartItemId} />
      </RecoilRoot>,
    );
  };

  it('수량 증가 버튼을 누르면 수량이 1 증가된다.', async () => {
    renderCartItem({ cartItemId: cartItemDummyData.cartItemId });

    // 이전 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe(cartItemDummyData.quantity.toString());

    // 수량 증가 버튼 클릭
    const increaseButton = screen.getByAltText('수량 증가');
    await waitFor(() => fireEvent.click(increaseButton));

    // 이후 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe((cartItemDummyData.quantity + 1).toString());
  });

  it('수량 감소 버튼을 누르면 수량이 1 감소된다.', async () => {
    renderCartItem({ cartItemId: cartItemDummyData.cartItemId });

    // 이전 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe(cartItemDummyData.quantity.toString());

    // 수량 증가 버튼 클릭
    const increaseButton = screen.getByAltText('수량 감소');
    await waitFor(() => fireEvent.click(increaseButton));

    // 이후 상태
    expect(screen.getByTestId('quantity-value').textContent).toBe((cartItemDummyData.quantity - 1).toString());
  });
});

describe('CartItem 컴포넌트에서 장바구니 항목 선택 테스트', () => {
  const QuantityChecker = ({ cartItemId }: { cartItemId: number }) => {
    const quantity = useRecoilValue(cartItemQuantityAtomFamily(cartItemId));
    return <span data-testid="quantity-value">{quantity}</span>;
  };

  const renderCartItem = ({ cartItemId }: { cartItemId: number }) => {
    return render(
      <RecoilRoot>
        <CartItem {...cartItemDummyData} />
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

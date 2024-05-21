import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { itemQuantityState } from '../recoil/atoms';
import { vi } from 'vitest';
import { QuantityController } from '../components/shoppingCart';

const mockProduct = {
  id: 11,
  name: '리복',
  price: 20000,
  imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
  category: 'fashion',
};
const mockOnChangeQuantity = vi.fn();

const quantityControllerSetup = (quantity: number) => {
  return render(
    <RecoilRoot initializeState={({ set }) => set(itemQuantityState(mockProduct.id), quantity)}>
      <QuantityController
        quantity={quantity}
        minQuantity={1}
        maxQuantity={10}
        onChangeQuantity={mockOnChangeQuantity}
      />
    </RecoilRoot>,
  );
};

describe('QuantityController', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('장바구니의 각 상품에 있는 주문수량 증가("+") 버튼을 누르면, 해당 상품의 수량이 1 증가해야 한다.', () => {
    quantityControllerSetup(1);

    const increaseButton = screen.getByTestId('cart-item-increase-button');
    fireEvent.click(increaseButton);

    expect(mockOnChangeQuantity).toHaveBeenCalledWith('increase');
  });

  it('장바구니의 각 상품에 있는 주문수량 감소("-") 버튼을 누르면, 해당 상품의 수량이 1 감소해야 한다.', () => {
    quantityControllerSetup(2);

    const decreaseButton = screen.getByTestId('cart-item-decrease-button');
    fireEvent.click(decreaseButton);

    expect(mockOnChangeQuantity).toHaveBeenCalledWith('decrease');
  });

  it('장바구니의 상품 수량이 1개라면, 주문수량 감소("-") 버튼을 누르더라도 관련 API 전송 작업이 이루어지지 않아야 한다.', () => {
    quantityControllerSetup(1);

    const decreaseButton = screen.getByTestId('cart-item-decrease-button');
    fireEvent.click(decreaseButton);

    expect(mockOnChangeQuantity).not.toHaveBeenCalled();
  });
});

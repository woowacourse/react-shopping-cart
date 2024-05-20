import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { itemQuantityState } from '../recoil/atoms';
import { useCheckCartItem } from '../hooks';
import { vi } from 'vitest';
import { CartItem } from '../components/shoppingCart';

type UseCheckCartItemReturn = ReturnType<typeof useCheckCartItem>;

const mockUseCheckCartItem: UseCheckCartItemReturn = {
  isChecked: vi.fn(),
  isAllChecked: false,
  onCheckCartItem: vi.fn(),
  onCheckAllCartItem: vi.fn(),
};

vi.mock('../hooks/useCheckCartItem', () => ({
  default: vi.fn(() => mockUseCheckCartItem),
}));

const mockProduct = {
  id: 11,
  name: '리복',
  price: 20000,
  imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
  category: 'fashion',
};
const mockOnDelete = vi.fn();
const mockOnUpdateQuantity = vi.fn();

const cartItemSetupWithQuantity = (quantity: number) => {
  return render(
    <RecoilRoot initializeState={({ set }) => set(itemQuantityState(mockProduct.id), quantity)}>
      <CartItem
        cartItemId={mockProduct.id}
        product={mockProduct}
        quantity={quantity}
        onDelete={mockOnDelete}
        onUpdateQuantity={mockOnUpdateQuantity}
      />
    </RecoilRoot>,
  );
};

describe('CartItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('장바구니의 각 상품 영역에는 해당 상품의 이름, 가격, 사진 등이 정확히 출력되어야 한다.', () => {
    cartItemSetupWithQuantity(1);

    expect(screen.getByText(mockProduct.name)).not.toBeNull();
    expect(screen.getByText(`${mockProduct.price.toLocaleString('ko-KR')}원`)).not.toBeNull();
    expect(screen.getByRole('img', { name: mockProduct.name })).not.toBeNull();
  });

  it('장바구니의 각 상품에 있는 체크박스에 사용자가 체크를 누르면, 해당 체크박스에 체크가 표시되어야 한다.', () => {
    cartItemSetupWithQuantity(1);

    const checkbox = screen.getByTestId('cart-item-checkbox');
    fireEvent.click(checkbox);

    expect(mockUseCheckCartItem.onCheckCartItem).toHaveBeenCalledWith(mockProduct.id, true);
  });

  it('장바구니의 각 상품에 있는 "삭제" 버튼을 사용자가 누르면, 해당 상품에 대한 삭제가 이루어져야 한다.', () => {
    cartItemSetupWithQuantity(1);

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it('장바구니의 각 상품에 있는 주문수량 증가("+") 버튼을 누르면, 해당 상품의 수량이 1 증가해야 한다.', () => {
    cartItemSetupWithQuantity(1);

    const increaseButton = screen.getByTestId('cart-item-increase-button');
    fireEvent.click(increaseButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 2);
  });

  it('장바구니의 각 상품에 있는 주문수량 감소("-") 버튼을 누르면, 해당 상품의 수량이 1 감소해야 한다.', () => {
    cartItemSetupWithQuantity(2);

    const decreaseButton = screen.getByTestId('cart-item-decrease-button');
    fireEvent.click(decreaseButton);

    expect(mockOnUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, 1);
  });

  it('장바구니의 상품 수량이 1개라면, 주문수량 감소("-") 버튼을 누르더라도 관련 API 전송 작업이 이루어지지 않아야 한다.', () => {
    cartItemSetupWithQuantity(1);

    const decreaseButton = screen.getByTestId('cart-item-decrease-button');
    fireEvent.click(decreaseButton);

    expect(mockOnUpdateQuantity).not.toHaveBeenCalled();
  });
});

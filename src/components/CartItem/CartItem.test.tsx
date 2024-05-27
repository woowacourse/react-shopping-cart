import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItem, { CartItemProps } from './CartItem';
import { RecoilRoot } from 'recoil';
import { useCartItemQuantity } from '../../recoil/cartItem/useCartItemQuantity';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';
import useCartItemList from '../../recoil/cartItemList/useCartItemList';

// Mock Recoil hooks
jest.mock('../../recoil/cartItem/useCartItemQuantity');
jest.mock('../../recoil/cartItem/useCartItemSelectedIdList');
jest.mock('../../recoil/cartItemList/useCartItemList');

const mockedUseCartItemQuantity = useCartItemQuantity as jest.Mock;
const mockedUseCartItemSelectedIdList = useCartItemSelectedIdList as jest.Mock;
const mockedUseCartItemList = useCartItemList as jest.Mock;

// Sample product data
const product = {
  productId: 3,
  name: '아디다스',
  price: 2000,
  imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
  category: 'fashion',
};

const mockCartItemProps: CartItemProps = {
  product,
  quantity: 5,
  cartItemId: 1,
};

describe('CartItem 컴포넌트', () => {
  beforeEach(() => {
    mockedUseCartItemQuantity.mockReturnValue({
      quantity: 5,
      updateQuantity: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    });

    mockedUseCartItemSelectedIdList.mockReturnValue({
      getIsSelected: jest.fn().mockReturnValue(false),
      addSelectedId: jest.fn(),
      removeSelectedId: jest.fn(),
    });

    mockedUseCartItemList.mockReturnValue({
      deleteCartItem: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <RecoilRoot>
        <CartItem {...mockCartItemProps} />
      </RecoilRoot>,
    );

    expect(screen.getByText('아디다스')).toBeInTheDocument();
    expect(screen.getByText('2,000원')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('삭제 버튼을 클릭했을 때 deleteCartItem 함수가 호출된다', () => {
    const { deleteCartItem } = mockedUseCartItemList();

    render(
      <RecoilRoot>
        <CartItem {...mockCartItemProps} />
      </RecoilRoot>,
    );

    fireEvent.click(screen.getByText('삭제'));
    expect(deleteCartItem).toHaveBeenCalledWith(mockCartItemProps.cartItemId);
  });

  test('체크박스를 클릭했을 때 선택 상태가 변경된다', () => {
    const { addSelectedId, removeSelectedId, getIsSelected } = mockedUseCartItemSelectedIdList();

    render(
      <RecoilRoot>
        <CartItem {...mockCartItemProps} />
      </RecoilRoot>,
    );

    // Initially not selected
    getIsSelected.mockReturnValue(false);
    const checkbox = screen.getByAltText('Checkbox');
    fireEvent.click(checkbox);
    expect(addSelectedId).toHaveBeenCalledWith(mockCartItemProps.cartItemId);

    // Now selected
    getIsSelected.mockReturnValue(true);
    fireEvent.click(checkbox);
    expect(removeSelectedId).toHaveBeenCalledWith(mockCartItemProps.cartItemId);
  });

  test('수량 증가 및 감소 버튼이 제대로 작동한다', () => {
    const { increaseQuantity, decreaseQuantity } = mockedUseCartItemQuantity();

    render(
      <RecoilRoot>
        <CartItem {...mockCartItemProps} />
      </RecoilRoot>,
    );

    const increaseButton = screen.getByLabelText('plus');
    const decreaseButton = screen.getByLabelText('minus');

    fireEvent.click(increaseButton);
    expect(increaseQuantity).toHaveBeenCalledTimes(1);

    fireEvent.click(decreaseButton);
    expect(decreaseQuantity).toHaveBeenCalledTimes(1);
  });
});

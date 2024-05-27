import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartItemList, { CartItemListProps } from './CartItemList';
import { RecoilRoot } from 'recoil';
import { useRecoilValue } from 'recoil';
import { cartItemSelectedIdListAtom } from '../../recoil/cartItem/cartItemAtom';
import { useCartItemSelectedIdList } from '../../recoil/cartItem/useCartItemSelectedIdList';

jest.mock('recoil');
jest.mock('../../recoil/cartItem/useCartItemSelectedIdList');

const product1 = {
  id: 586,
  quantity: 4,
  product: {
    productId: 2,
    name: '나이키',
    price: 1000,
    imageUrl:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png',
    category: 'fashion',
  },
};

const product2 = {
  id: 587,
  quantity: 3,
  product: {
    productId: 3,
    name: '아디다스',
    price: 2000,
    imageUrl: 'https://sitem.ssgcdn.com/74/25/04/item/1000373042574_i1_750.jpg',
    category: 'fashion',
  },
};

const mockCartItemListProps: CartItemListProps = {
  itemList: [
    { id: 586, product: product1, quantity: 1, cartItemId: 1 },
    { id: 586, product: product2, quantity: 2, cartItemId: 2 },
  ],
};

// Mock functions
const mockedUseRecoilValue = useRecoilValue as jest.Mock;
const mockedUseCartItemSelectedIdList = useCartItemSelectedIdList as jest.Mock;

describe('CartItemList 컴포넌트', () => {
  beforeEach(() => {
    mockedUseRecoilValue.mockReturnValue([]);
    mockedUseCartItemSelectedIdList.mockReturnValue({
      unselectAll: jest.fn(),
      selectAll: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('컴포넌트가 올바르게 렌더링된다', () => {
    render(
      <RecoilRoot>
        <CartItemList {...mockCartItemListProps} />
      </RecoilRoot>,
    );

    expect(screen.getByText('전체선택')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('전체선택 체크박스를 클릭했을 때 selectAll 함수가 호출된다', () => {
    mockedUseRecoilValue.mockReturnValue([]);
    const { selectAll } = mockedUseCartItemSelectedIdList();

    render(
      <RecoilRoot>
        <CartItemList {...mockCartItemListProps} />
      </RecoilRoot>,
    );

    const selectAllCheckbox = screen.getByRole('checkbox');
    fireEvent.click(selectAllCheckbox);
    expect(selectAll).toHaveBeenCalledTimes(1);
  });

  test('전체선택 체크박스를 클릭했을 때 unselectAll 함수가 호출된다', () => {
    mockedUseRecoilValue.mockReturnValue(mockCartItemListProps.itemList.map((item) => item.cartItemId));
    const { unselectAll } = mockedUseCartItemSelectedIdList();

    render(
      <RecoilRoot>
        <CartItemList {...mockCartItemListProps} />
      </RecoilRoot>,
    );

    const selectAllCheckbox = screen.getByRole('checkbox');
    fireEvent.click(selectAllCheckbox);
    expect(unselectAll).toHaveBeenCalledTimes(1);
  });
});

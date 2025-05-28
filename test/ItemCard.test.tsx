import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';

import CartPage from '../src/pages/CartPage';
import { mockCartItems } from './mocks';
import CartItemsProvider from '../src/contexts/CartItemsProvider';

describe('ItemCard 테스트', () => {
  let firstItemCard: HTMLElement;

  beforeEach(async () => {
    render(
      <CartItemsProvider>
        <CartPage />
      </CartItemsProvider>
    );
    const ItemCardList = await screen.findAllByTestId('item-card');
    firstItemCard = ItemCardList[0];
  });

  it('받아온 아이템에 대한 정보를 렌더링 한다 ', async () => {
    const mockData = mockCartItems[0];
    const product = mockData.product;
    const quantity = mockData.quantity;

    expect(within(firstItemCard).getByText(product.name)).toBeInTheDocument();

    expect(
      within(firstItemCard).getByText(product.price.toLocaleString() + '원')
    ).toBeInTheDocument();

    expect(within(firstItemCard).getByRole('img')).toHaveAttribute(
      'src',
      product.imageUrl
    );

    expect(within(firstItemCard).getByText(quantity)).toBeInTheDocument();
  });

  it('+ 버튼 클릭 시 수량이 증가한다.', async () => {
    const plusButton = within(firstItemCard).getByText('+');
    const currentQuantity = mockCartItems[0].quantity;

    fireEvent.click(plusButton);

    await waitFor(() => {
      expect(
        within(firstItemCard).getByText(currentQuantity + 1)
      ).toBeInTheDocument();
    });
  });

  it('- 버튼 클릭 시 수량이 감소한다.', async () => {
    const minusButton = within(firstItemCard).getByText('-');
    const currentQuantity = mockCartItems[0].quantity;

    fireEvent.click(minusButton);

    await waitFor(() => {
      expect(
        within(firstItemCard).getByText(currentQuantity - 1)
      ).toBeInTheDocument();
    });
  });

  it("수량이 1일 때 '-' 버튼 클릭 시 상품이 삭제된다.", async () => {
    const secondItemCard = screen.getAllByTestId('item-card')[1];
    const minusButton = within(secondItemCard).getByText('-');

    fireEvent.click(minusButton);

    await waitFor(() => {
      expect(secondItemCard).not.toBeInTheDocument();
    });
  });

  it('삭제 버튼 클릭 시 상품이 삭제된다.', async () => {
    const deleteButton = within(firstItemCard).getByText('삭제');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(firstItemCard).not.toBeInTheDocument();
    });
  });
});

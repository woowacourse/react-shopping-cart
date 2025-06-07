import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';

import { mockCartItems } from '../mocks';
import { act } from 'react';
import App from '../../src/App';

describe('ItemInfoCard 테스트', () => {
  let firstItemCard: HTMLElement;

  beforeEach(async () => {
    await act(() => render(<App />));

    const confirmButton = screen.getByText('주문 확인');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByTestId('orderPage')).toBeInTheDocument();
    });

    const ItemCardList = screen.getAllByTestId('item-info-card');
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

    expect(within(firstItemCard).getByAltText('product-image')).toHaveAttribute(
      'src',
      product.imageUrl
    );

    expect(within(firstItemCard).getByText(quantity + '개')).toBeInTheDocument();
  });
});

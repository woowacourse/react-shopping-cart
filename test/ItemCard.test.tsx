import { render, screen } from '@testing-library/react';
import ItemCard from '../src/components/ItemCard';
import { mockCartItems } from './mocks';

describe('ItemCard 테스트', () => {
  it('받아온 아이템에 대한 정보를 렌더링 한다 ', () => {
    const product = mockCartItems[0].product;
    const quantity = mockCartItems[0].quantity;
    render(<ItemCard product={product} quantity={quantity} />);

    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(
      screen.getByText(product.price.toLocaleString() + '원')
    ).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', product.imageUrl);
    expect(screen.getByText(quantity)).toBeInTheDocument();
  });
});

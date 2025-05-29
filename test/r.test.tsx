import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartContents from '../src/components/features/cart/cartContents/CartContents';

describe('RTL Test', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <CartContents />
      </BrowserRouter>
    );
  });

  it('should render', async () => {
    const text = await screen.findByText('현재 4종류의 상품이 담겨있습니다.');

    expect(text).toBeInTheDocument();
  });
});

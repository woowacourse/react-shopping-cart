import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import CartContents from '../src/components/features/cart/cartContents/CartContents';

describe('RTL Test', () => {
  it('should render', () => {
    render(
      <BrowserRouter>
        <CartContents />
      </BrowserRouter>
    );
    expect(screen.getByText('장바구니')).toBeInTheDocument();
  });
});

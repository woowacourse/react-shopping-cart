import { render, screen } from '@testing-library/react';
import Product from '.';

describe('product 컴포넌트', () => {
  test('Product 컴포넌트는 상품 이미지, 이름, 가격을 렌더링할 수 있어야 한다.', () => {
    const data = {
      image: 'https://i.pinimg.com/474x/4a/47/d5/4a47d5956eb090ff702e3b2cb47fdf98.jpg',
      name: '사과',
      price: 1300,
    };

    render(<Product {...data}></Product>);

    expect(screen.getByText(data.name));
  });
});

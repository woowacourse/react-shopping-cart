// CartQuantityField.test.tsx
import { render, fireEvent } from '@testing-library/react';
import { server } from '../../mocks/server';

import CartQuantityField from './CartQuantityField';
import { RecoilRoot } from 'recoil';

// 테스트 데이터를 세팅합니다.
const testProduct = {
  id: 1,
  name: 'PET보틀-정사각(420ml)',
  price: 43400,
  imageUrl: 'http://placekitten.com/200/200',
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('check quantity change', async () => {
  const { getByRole } = await render(
    <RecoilRoot>
      <CartQuantityField product={testProduct} />
    </RecoilRoot>
  );

  const quantityInput = getByRole('increase');

  expect(quantityInput).toBe('5');
});

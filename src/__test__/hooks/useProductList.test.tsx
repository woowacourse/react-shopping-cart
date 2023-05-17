import { renderHook } from '@testing-library/react';
import useProductList from '@hooks/useProductList';

test('API 변경에 유연하도록 구현한 API 레이어가 올바르게 기능하는 지 테스트', () => {
  const { result } = renderHook(() => useProductList());

  const product = result.current[0];

  const productKeys = Object.keys(product);

  expect(productKeys).toEqual(['id', 'name', 'price', 'imageUrl']);
});

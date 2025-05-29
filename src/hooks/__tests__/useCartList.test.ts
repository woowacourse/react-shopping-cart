import { act, renderHook } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../../mocks/setup';
import { describe, it, expect } from 'vitest';

import useCartList from '../useCartList';
import mockCart from '../../mocks/mockCart.json';

const getMockCartList = () => {
  return http.get('/cart-items', () => {
    return HttpResponse.json({ content: mockCart });
  });
};

describe('useCartList 훅 테스트', () => {
  it('초기 cartList의 상태 값은 목 데이터를 받아오고, isError의 상태 값은 "", isLoading의 상태 값은 false', async () => {
    server.use(getMockCartList());

    const { result } = renderHook(() => useCartList());

    await act(async () => null);

    expect(result.current.cartList).toEqual(mockCart);
  });
});

import { renderHook } from '@testing-library/react';
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { couponsState, itemDetailsState, itemsState } from './atoms';
import { act } from 'react';
import { fetchCoupons } from '../api/index';
import { mockCoupons } from '../mocks/coupons';

describe('itemsState', () => {
  it('초기값은 빈 배열이어야 한다.', () => {
    const { result } = renderHook(() => useRecoilValue(itemsState), {
      wrapper: RecoilRoot,
    });
    expect(result.current.length).toBe(0);
  });

  it('값을 추가할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(itemsState), {
      wrapper: RecoilRoot,
    });

    const data = {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: '나이키',
        price: 10000,
        imageUrl: 'sample.com',
        category: 'fashion',
      },
    };

    act(() => {
      result.current[1]((prevState) => [...prevState, data]);
    });
    expect(result.current[0]).toStrictEqual([data]);
  });

  it('값을 삭제할 수 있다.', () => {
    const { result } = renderHook(() => useRecoilState(itemsState), {
      wrapper: RecoilRoot,
    });

    const data = {
      id: 1,
      quantity: 1,
      product: {
        id: 1,
        name: '나이키',
        price: 10000,
        imageUrl: 'sample.com',
        category: 'fashion',
      },
    };

    act(() => {
      result.current[1]((prevState) =>
        prevState.filter((value) => value.id === data.id),
      );
    });
    expect(result.current[0]).toStrictEqual([]);
  });

  describe('itemDetailsState', () => {
    it('id가 1일 때 초기값은 { quantity: 1, price: 0, isChecked: true } 이어야 한다.', () => {
      const { result } = renderHook(() => useRecoilValue(itemDetailsState(1)), {
        wrapper: RecoilRoot,
      });
      expect(result.current).toMatchObject({
        quantity: 1,
        isChecked: true,
      });
    });

    it('id가 1인 상태값의 quantity, price, isChecked 값을 업데이트 할 수 있다.', () => {
      const { result } = renderHook(() => useRecoilState(itemDetailsState(1)), {
        wrapper: RecoilRoot,
      });

      const newData = {
        quantity: 2,
        price: 1000,
        isChecked: false,
      };

      act(() => {
        result.current[1](newData);
      });
      expect(result.current[0]).toMatchObject(newData);
    });
  });
});
jest.mock('../api/index', () => ({
  fetchCoupons: jest.fn(),
}));

describe('couponsState', () => {
  it('초기값이 제대로 작동된다.', async () => {
    (fetchCoupons as jest.Mock).mockResolvedValue(mockCoupons);
    const { result } = renderHook(() => useRecoilState(couponsState), {
      wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
    });

    // act를 사용하여 비동기 업데이트를 처리
    act(() => {
      result.current[1](mockCoupons);
    });

    // 초기 상태가 빈 배열인지 확인
    expect(result.current[0].length).toEqual(4);
  });
});

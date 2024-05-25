import { RecoilRoot, useRecoilState } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { selectedDeliveryInfoListState } from './selectedDeliveryInfoListState';

describe('초기값이 제대로 설정되어야 한다', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useRecoilState(selectedDeliveryInfoListState), {
      wrapper: RecoilRoot,
    });

    const [value] = result.current;
    expect(value).toEqual([]);
  });

  it('값을 설정할 수 있어야 한다.', () => {
    const { result } = renderHook(() => useRecoilState(selectedDeliveryInfoListState), {
      wrapper: RecoilRoot,
    });

    const newDeliveryInfoList = [{ title: '제주도 및 도서 산간 지역', surcharge: 3000 }];

    act(() => {
      result.current[1](newDeliveryInfoList);
    });

    const [value] = result.current;
    expect(value).toEqual(newDeliveryInfoList);
  });
});

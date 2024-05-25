import { act } from 'react';
import { RecoilRoot, useRecoilCallback, useRecoilValue } from 'recoil';

import { renderHook } from '@testing-library/react';

import { selectedDeliveryInfoListMockData } from '../../../mockData/selectedDeliveryListMockData';
import { DeliveryInfo } from '../../../types/DeliveryInfo.type';
import { selectedDeliveryInfoListState } from '../atoms/selectedDeliveryInfoListState';
import { selectedDeliveryInfoListSelector } from './selectedDeliveryInfoListSelector';

describe('selectedDeliveryInfoListSelector', () => {
  it('선택된 배송 정보가 올바르게 추가된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedDeliveryInfoList = useRecoilValue(selectedDeliveryInfoListState);
        const setSelectedDeliveryInfo = useRecoilCallback(({ set }) => (deliveryInfo: DeliveryInfo) => {
          set(selectedDeliveryInfoListSelector(deliveryInfo), true);
        });

        return { selectedDeliveryInfoList, setSelectedDeliveryInfo };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedDeliveryInfo(selectedDeliveryInfoListMockData[0]);
    });

    expect(result.current.selectedDeliveryInfoList).toHaveLength(1);
    expect(result.current.selectedDeliveryInfoList[0].title).toBe(selectedDeliveryInfoListMockData[0].title);
  });

  it('선택된 배송 정보가 올바르게 제거된다.', () => {
    const { result } = renderHook(
      () => {
        const selectedDeliveryInfoList = useRecoilValue(selectedDeliveryInfoListState);
        const setSelectedDeliveryInfo = useRecoilCallback(({ set }) => (deliveryInfo: DeliveryInfo) => {
          set(selectedDeliveryInfoListSelector(deliveryInfo), false);
        });

        return { selectedDeliveryInfoList, setSelectedDeliveryInfo };
      },
      {
        wrapper: RecoilRoot,
      },
    );

    act(() => {
      result.current.setSelectedDeliveryInfo(selectedDeliveryInfoListMockData[0]);
    });

    act(() => {
      result.current.setSelectedDeliveryInfo(selectedDeliveryInfoListMockData[0]);
    });

    expect(result.current.selectedDeliveryInfoList).toHaveLength(0);
  });
});

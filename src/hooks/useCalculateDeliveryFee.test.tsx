import { RecoilRoot } from 'recoil';

import { act, renderHook } from '@testing-library/react';

import { DELIVERY_FEE_DISCOUNT_THRESHOLD } from '../constants/DELIVERY_INFOS';
import { selectedDeliveryInfoListMockData } from '../mockData/selectedDeliveryListMockData';
import { selectedCartItemListState } from '../recoil/CartItem/atoms/selectedCartItemListState';
import { deliveryFeeState } from '../recoil/DeliveryFee/atoms/deliveryFeeState';
import { selectedDeliveryInfoListState } from '../recoil/DeliveryInfo/atoms/selectedDeliveryInfoListState';
import { CartItem } from '../types/CartItem';
import { useCalculateDeliveryFee } from './useCalculateDeliveryFee';

describe('useCalculateDeliveryFee', () => {
  it(`총 결제 금액이 0과 ${DELIVERY_FEE_DISCOUNT_THRESHOLD} 사이일 경우 배송비를 정확히 계산하여야 한다. `, () => {
    const mockCartItems = [
      {
        id: 1578,
        quantity: 4,
        product: {
          id: 12,
          name: '컨버스',
          price: 20000,
          imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
          category: 'fashion',
        },
      },
    ] as CartItem[];
    const { result } = renderHook(() => useCalculateDeliveryFee(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedDeliveryInfoListState, []);
            set(selectedCartItemListState, mockCartItems);
            set(deliveryFeeState, 0);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateDeliveryFee();
    });

    expect(result.current.deliveryFee).toBe(3000);
  });

  it(`총 결제 금액이 ${DELIVERY_FEE_DISCOUNT_THRESHOLD}를 넘을 경우 배송비는 0이 되어야 한다.`, () => {
    const mockCartItems = [
      {
        id: 1578,
        quantity: 5,
        product: {
          id: 12,
          name: '컨버스',
          price: 20000,
          imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
          category: 'fashion',
        },
      },
    ] as CartItem[];
    const { result } = renderHook(() => useCalculateDeliveryFee(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedDeliveryInfoListState, []);
            set(selectedCartItemListState, mockCartItems);
            set(deliveryFeeState, 0);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateDeliveryFee();
    });

    expect(result.current.deliveryFee).toBe(0);
  });

  it(`총 결제 금액이 0일 경우 배송비는 0이 되어야 한다.`, () => {
    const mockCartItems = [] as CartItem[];
    const { result } = renderHook(() => useCalculateDeliveryFee(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedDeliveryInfoListState, []);
            set(selectedCartItemListState, mockCartItems);
            set(deliveryFeeState, 0);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateDeliveryFee();
    });

    expect(result.current.deliveryFee).toBe(0);
  });

  it(`총 결제 금액이 0과 ${DELIVERY_FEE_DISCOUNT_THRESHOLD} 사이이고 제주도 및 도서 산간 지역일 경우 배송비를 정확히 계산하여야 한다. `, () => {
    const mockCartItems = [
      {
        id: 1578,
        quantity: 4,
        product: {
          id: 12,
          name: '컨버스',
          price: 20000,
          imageUrl: 'https://sitem.ssgcdn.com/65/73/69/item/1000163697365_i1_750.jpg',
          category: 'fashion',
        },
      },
    ] as CartItem[];
    const { result } = renderHook(() => useCalculateDeliveryFee(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedDeliveryInfoListState, selectedDeliveryInfoListMockData);
            set(selectedCartItemListState, mockCartItems);
            set(deliveryFeeState, 0);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    act(() => {
      result.current.calculateDeliveryFee();
    });

    expect(result.current.deliveryFee).toBe(6000);
  });
});

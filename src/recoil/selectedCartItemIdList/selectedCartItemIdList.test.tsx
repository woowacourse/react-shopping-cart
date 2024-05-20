import { renderHook } from '@testing-library/react';
import { useSelectedCartItemIdList } from './hooks';
import { RecoilRoot } from 'recoil';
import { act } from 'react';
import { selectedCartItemIdListAtom } from './states';
import { cartItemListAtom } from '../cartItemList/states';
// import { selectedCartItemIdListAtom } from './states';

const cartItemListDummyData = [
  {
    quantity: 10,
    product: {
      id: 11,
      name: '리복',
      price: 20000,
      imageUrl: 'https://image.msscdn.net/images/goods_img/20221031/2909092/2909092_6_500.jpg',
      category: 'fashion',
    },
    cartItemId: 1,
  },
  {
    quantity: 23,
    product: {
      id: 10,
      name: '퓨마',
      price: 10000,
      imageUrl: 'https://sitem.ssgcdn.com/47/78/22/item/1000031227847_i1_750.jpg',
      category: 'fashion',
    },
    cartItemId: 2,
  },
];

describe('장바구니 선택 목록 테스트', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('장바구니 선택 목록에 아이템을 추가할 수 있다.', async () => {
    const cartItemId = 1;
    const { result } = renderHook(() => useSelectedCartItemIdList(), { wrapper: RecoilRoot });

    await act(async () => {
      result.current.addSelectedItemId(cartItemId);
    });

    expect(result.current.getIsSelected(cartItemId)).toBeTruthy();
  });

  it('장바구니 선택 목록에 아이템을 제거할 수 있다.', async () => {
    const cartItemIdList = [1, 2];

    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCartItemIdListAtom, cartItemIdList)}>
          {children}
        </RecoilRoot>
      ),
    });

    await act(async () => {
      result.current.deleteSelectedItemId(cartItemIdList[0]);
    });

    expect(result.current.getIsSelected(cartItemIdList[0])).toBeFalsy();
  });

  it('장바구니 선택 목록에 아이템을 제거할 수 있다.', async () => {
    const cartItemIdList = [1, 2];

    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot initializeState={({ set }) => set(selectedCartItemIdListAtom, cartItemIdList)}>
          {children}
        </RecoilRoot>
      ),
    });

    await act(async () => {
      result.current.deleteSelectedItemId(cartItemIdList[0]);
    });

    expect(result.current.getIsSelected(cartItemIdList[0])).toBeFalsy();
  });

  it('장바구니의 모든 아이템들을 선택한다.', async () => {
    const cartItemIdList = [1, 2];

    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListAtom, []);
            set(cartItemListAtom, cartItemListDummyData);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    await act(async () => {
      result.current.selectAll();
    });

    cartItemIdList.forEach((id: number) => {
      expect(result.current.getIsSelected(id)).toBeTruthy();
    });
  });

  it('장바구니의 모든 아이템들을 선택하지 않는다.', async () => {
    const cartItemIdList = [1, 2];

    const { result } = renderHook(() => useSelectedCartItemIdList(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) => {
            set(selectedCartItemIdListAtom, cartItemIdList);
            set(cartItemListAtom, cartItemListDummyData);
          }}
        >
          {children}
        </RecoilRoot>
      ),
    });

    await act(async () => {
      result.current.clear();
    });

    cartItemIdList.forEach((id: number) => {
      expect(result.current.getIsSelected(id)).toBeFalsy();
    });
  });
});

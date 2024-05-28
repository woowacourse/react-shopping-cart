import { act } from 'react';

import { RecoilRoot } from 'recoil';

import { renderHook } from '@testing-library/react';

import { useSelectedCartItemId } from './useSelectedCartItemId';
import { selectedCartItemIdListState } from '../../recoil/cartItem/atom';

describe('useSelectedCartItemId', () => {
  const MOCK_DEFAULT_VALUE = [2463, 2464, 2465];

  it('isSelectedId는 selectedCartItemId에 해당 id가 있으면 true를 반환한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemId(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(selectedCartItemIdListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isSelectedId(MOCK_DEFAULT_VALUE[0])).toBe(true);
  });

  it('isSelectedId는 selectedCartItemId에 해당 id가 없으면 false를 반환한다.', () => {
    const { result } = renderHook(() => useSelectedCartItemId(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(selectedCartItemIdListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    expect(result.current.isSelectedId(111)).toBe(false);
  });

  it('selectCartItem은 카트 아이템 id를 추가해야 한다.', async () => {
    const { result } = renderHook(() => useSelectedCartItemId(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(selectedCartItemIdListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    await act(async () => await result.current.selectCartItem(2466));
    expect(result.current.isSelectedId(2466)).toBe(true);
  });

  it('unselectCartItem은 카트 아이템 id를 제거해야 한다.', async () => {
    const { result } = renderHook(() => useSelectedCartItemId(), {
      wrapper: ({ children }) => (
        <RecoilRoot
          initializeState={({ set }) =>
            set(selectedCartItemIdListState, MOCK_DEFAULT_VALUE)
          }
        >
          {children}
        </RecoilRoot>
      ),
    });
    await act(async () => await result.current.unselectCartItem(2463));
    expect(result.current.isSelectedId(2463)).toBe(false);
  });
});

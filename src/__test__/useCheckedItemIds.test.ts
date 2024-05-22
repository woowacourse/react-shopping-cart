import { RecoilRoot } from 'recoil';
import { act } from 'react';
import { renderHook } from '@testing-library/react';
import useCheckedItemIds from '../hooks/useCheckedItemIds';

jest.mock('../apis/config', () => ({
  API_CONFIG: {
    API_URL: 'http://localhost:mock',
  },
}));

describe('useCheckedItemIds', () => {
  const TARGET_ID = 1;
  it('등록되지 않은 id의 경우 기본 값은 true이다', () => {
    const { result } = renderHook(() => useCheckedItemIds(), {
      wrapper: RecoilRoot,
    });

    const { getIsChecked } = result.current;

    const isChecked = getIsChecked(TARGET_ID);

    expect(isChecked).toBe(true);
  });

  it('id를 통해 check 할 수 있다.', () => {
    const { result } = renderHook(() => useCheckedItemIds(), {
      wrapper: RecoilRoot,
    });

    const { getIsChecked, checkIds: checkId } = result.current;

    act(() => checkId(TARGET_ID));

    const isChecked = getIsChecked(TARGET_ID);

    expect(isChecked).toBe(true);
  });

  it('id를 통해 uncheck 할 수 있다.', () => {
    const { result } = renderHook(() => useCheckedItemIds(), {
      wrapper: RecoilRoot,
    });

    act(() => result.current.uncheckIds(TARGET_ID));
    expect(result.current.getIsChecked(TARGET_ID)).toBe(false);
  });
});

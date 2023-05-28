import { renderHook } from '@testing-library/react';
import useCount from '../hooks/useCount';
import {
  ACTION_CHANGE,
  ACTION_DECREASE,
  ACTION_INCREASE,
} from '../constants/counter';
import { act } from 'react-dom/test-utils';

describe('useCount 테스트', () => {
  it('count의 초기 상태는 1을 가진다.', () => {
    const { result } = renderHook(() => useCount());
    expect(result.current.count.value).toBe(1);
  });

  it('INCREASE 액션으로 1의 값만큼 올린다.', () => {
    const { result } = renderHook(() => useCount());
    expect(result.current.count.value).toBe(1);
    act(() => {
      result.current.setCount({ action: ACTION_INCREASE, payload: '' });
    });
    expect(result.current.count.value).toBe(2);
  });

  it('DECREASE 액션으로 숫자를 1의 값만큼 내린다.', () => {
    const { result } = renderHook(() => useCount());
    expect(result.current.count.value).toBe(1);
    act(() => {
      result.current.setCount({ action: ACTION_INCREASE, payload: '' });
      result.current.setCount({ action: ACTION_DECREASE, payload: '' });
    });
    expect(result.current.count.value).toBe(1);
  });

  it('CHANGE 액션으로 원하는 숫자값으로 값을 변경 할 수 있다.', () => {
    const { result } = renderHook(() => useCount());
    act(() => {
      result.current.setCount({ action: ACTION_CHANGE, payload: '120' });
    });
    expect(result.current.count.value).toBe(120);
  });

  it('CHANGE 액션으로 잘못된 값을 전달할 경우, 숫자값을 제외한 값은 공백으로 바꾼다.', () => {
    const { result } = renderHook(() => useCount());
    act(() => {
      result.current.setCount({ action: ACTION_CHANGE, payload: 'dff1bb12' });
    });
    expect(result.current.count.value).toBe(112);
  });

  it('CHANGE 액션으로 잘못된 값을 전달할 경우, 모두 숫자가 아닌경우 0으로 설정한다.', () => {
    const { result } = renderHook(() => useCount());
    act(() => {
      result.current.setCount({
        action: ACTION_CHANGE,
        payload: 'ㄴ어ㅣㅇㄴ러',
      });
    });
    expect(result.current.count.value).toBe(0);
  });
});

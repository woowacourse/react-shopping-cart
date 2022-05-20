import { renderHook } from '@testing-library/react';
import useReduxState from 'hooks/useReduxState';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector({ test: { data: 1 } }),
}));

test('useReduxState 커스텀 훅 테스트', () => {
  const { result } = renderHook(() => useReduxState('test'));

  expect(result.current.state).toEqual({ data: 1 });
  expect(typeof result.current.dispatch).toBe('function');
});

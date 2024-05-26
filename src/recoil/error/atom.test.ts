import { act } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { renderHook } from '@testing-library/react';
import { apiErrorState } from './atom';
import { API_ERROR_STATE_TEST_CASES } from './mock';

describe('Error/atom.ts 테스트', () => {
  describe('apiErrorState 테스트', () => {
    it('초기값은 null 여야 한다.', () => {
      const { result } = renderHook(() => useRecoilState(apiErrorState), {
        wrapper: RecoilRoot,
      });

      expect(result.current[0]).toBe(null);
    });

    it.each(API_ERROR_STATE_TEST_CASES)(
      'setState를 호출하여 "${input}"으로 값을 설정한 경우, 상태는 같은 값인 "${expected}"으로 설정되어야 한다.',
      ({ input, expected }: TEST_ITEM_PROP<Error | null>) => {
        const { result } = renderHook(() => useRecoilState(apiErrorState), {
          wrapper: RecoilRoot,
        });

        act(() => result.current[1](input));

        expect(result.current[0]).toEqual(expected);
      },
    );
  });
});

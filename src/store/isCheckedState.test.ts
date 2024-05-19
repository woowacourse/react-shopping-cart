import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { isCheckedState } from './atoms';
import { act } from 'react';

describe('isCheckedState AtomFamily 테스트', () => {
  beforeEach(() => {
    // 로컬 스토리지 clear
    window.localStorage.clear();
    // 로컬 스토리지에 Id, isChecked 상태를 설정
    window.localStorage.setItem(JSON.stringify(172), JSON.stringify(true));
    window.localStorage.setItem(JSON.stringify(373), JSON.stringify(false));
  });

  it('로컬 스토리지 내에서 Id가 172이고 값이 true인 isChecked 상태를, recoil의 상태값인 isCheckedState에 저장한다.,', async () => {
    const { result } = renderHook(() => useRecoilState(isCheckedState(172)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(true);
    });
  });

  it('로컬 스토리지 내에서 Id가 373이고 값이 false인 isChecked 상태를, recoil의 상태값인 isCheckedState에 저장한다.,', async () => {
    const { result } = renderHook(() => useRecoilState(isCheckedState(373)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });
  });

  it('로컬 스토리지 내에서 Id 200가 없으면, recoil의 상태값인 isCheckedState는 기본값 true로 저장한다.,', async () => {
    const { result } = renderHook(() => useRecoilState(isCheckedState(200)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(true);
    });
  });

  it('isCheckedState selector의 변수를 false와 true로 업데이트 할 수 있다.', async () => {
    const { result } = renderHook(() => useRecoilState(isCheckedState(172)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      act(() => {
        result.current[1](false);
      });

      expect(result.current[0]).toBe(false);

      act(() => {
        result.current[1](true);
      });

      expect(result.current[0]).toBe(true);
    });
  });
});

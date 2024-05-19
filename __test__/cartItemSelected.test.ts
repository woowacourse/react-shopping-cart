import { renderHook, waitFor } from '@testing-library/react';
import { RecoilRoot, useRecoilState } from 'recoil';
import cartListMockData from '../src/mocks/cartListMockData';
import { cartItemSelected } from '../src/recoil/atoms';

describe('cartItemSelected', () => {
  const [TEST_ITEM] = cartListMockData.content;

  test('장바구니 아이템이 local storage에 존재하지 않으면 기본 값은 false다.', async () => {
    const { result } = renderHook(() => useRecoilState(cartItemSelected(1)), {
      wrapper: RecoilRoot,
    });

    await waitFor(() => {
      expect(result.current[0]).toBe(false);
    });
  });

  test('개별 상품을 선택하면 선택 여부가 atom에 반영된다.', async () => {
    const { result } = renderHook(
      () => {
        const [isSelected, setSelected] = useRecoilState(
          cartItemSelected(TEST_ITEM.id)
        );
        setSelected(true);

        return isSelected;
      },
      {
        wrapper: RecoilRoot,
      }
    );

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});

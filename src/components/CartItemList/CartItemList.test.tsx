import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import CartItemList from './CartItemList';
import { cartItemListState } from '../../recoil/cartItemList/cartItemListState';
import { mockCartItemList } from '../../mocks/cartItemList';
import '@testing-library/jest-dom';
import { act } from 'react';
import { selectedCartItemIdListState } from '../../recoil/selectedCartItemList/selectedCartItemIdListState';

describe('CartItemList 컴포넌트의 전체 선택 버튼 테스트', () => {
  const renderCartItemList = (initialSelectedIdList: number[] = []) => {
    return render(
      <RecoilRoot
        initializeState={({ set }) => {
          set(cartItemListState, mockCartItemList);
          set(selectedCartItemIdListState, initialSelectedIdList);
        }}
      >
        <CartItemList />
      </RecoilRoot>,
    );
  };

  it('선택 목록이 빈 채로 cartItemList를 렌더링하면 전체 선택 버튼은 체크되어있지 않다.', async () => {
    renderCartItemList();

    const selectAllButton = screen.getByAltText('상품 선택');

    expect(selectAllButton).not.toBeChecked();
  });

  it('선택 목록이 빈 채로 cartItemList를 렌더링하면 모든 선택 버튼은 체크되어있지 않다.', async () => {
    renderCartItemList();

    const checkboxList = screen.getAllByAltText('Checkbox');

    checkboxList.forEach((checkbox) => expect(checkbox).not.toBeChecked());
  });

  it('선택 목록이 빈 채로 전체 선택 버튼을 누르면 모든 아이템이 선택된다.', async () => {
    renderCartItemList();

    const selectAllButton = screen.getByAltText('상품 선택');

    await act(() => fireEvent.click(selectAllButton));
    const checkboxList = screen.getAllByAltText('Checkbox');

    await waitFor(() => checkboxList.forEach((checkbox) => expect(checkbox).toBeChecked()));
  });

  it('선택 목록이 가득 찬 채로 전체 선택 버튼을 누르면 모든 아이템이 선택 해제된다.', async () => {
    renderCartItemList(mockCartItemList.map(({ cartItemId }) => cartItemId));

    const selectAllButton = screen.getByAltText('상품 선택');

    await act(() => fireEvent.click(selectAllButton));
    const checkboxList = screen.getAllByAltText('Checkbox');

    await waitFor(() => checkboxList.forEach((checkbox) => expect(checkbox).not.toBeChecked()));
  });
});

import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { act } from 'react';
import App from '../../src/App';

describe('전체 선택 테스트', () => {
  beforeEach(async () => {
    await act(() => render(<App />));
  });

  it('초기 상태는 전체 선택이 체크되어있다.', async () => {
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');
    await waitFor(() => {
      expect(allCheckBox).toHaveAttribute('alt', 'checkedBox');
    });
  });

  it('선택 요소 중 하나라도 선택이 해제되면 전체 선택도 선택이 해제된다.', async () => {
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');

    const itemCards = await screen.findAllByTestId('item-card');
    const firstItemCheckBox = within(itemCards[0]).getByTestId('checkBox');
    fireEvent.click(firstItemCheckBox);

    await waitFor(() => {
      expect(allCheckBox).toHaveAttribute('alt', 'unCheckedBox');
    });
  });

  it('전체 선택을 클릭했을 때 모든 장바구니 목록의 선택이 해제된다.', async () => {
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');
    fireEvent.click(allCheckBox);

    const checkedBoxes = await screen.findAllByTestId('checkBox');

    await waitFor(() => {
      checkedBoxes.forEach((box) => {
        expect(box).toHaveAttribute('alt', 'unCheckedBox');
      });
    });
  });

  it('전체 선택이 해제된 상태에서 다시 클릭 시 모든 장바구니 목록이 선택택된다.', async () => {
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');
    fireEvent.click(allCheckBox);

    await waitFor(() => {
      expect(allCheckBox).toHaveAttribute('alt', 'unCheckedBox');
    });

    fireEvent.click(allCheckBox);

    const checkedBoxes = await screen.findAllByTestId('checkBox');

    await waitFor(() => {
      checkedBoxes.forEach((box) => {
        expect(box).toHaveAttribute('alt', 'checkedBox');
      });
    });
  });

  it('전체 선택이 해제된 상태에서 모든 상품을 선택할 시 전체 선택이 선택된다.', async () => {
    const allCheckSection = screen.getByTestId('allCheckSection');
    const allCheckBox = within(allCheckSection).getByTestId('checkBox');
    fireEvent.click(allCheckBox);

    await waitFor(() => {
      expect(allCheckBox).toHaveAttribute('alt', 'unCheckedBox');
    });

    const checkedBoxes = await screen.findAllByTestId('checkBox');
    const itemCheckBoxes = checkedBoxes.slice(1);
    itemCheckBoxes.forEach((box) => {
      fireEvent.click(box);
    });

    await waitFor(() => {
      expect(allCheckBox).toHaveAttribute('alt', 'checkedBox');
    });
  });
});

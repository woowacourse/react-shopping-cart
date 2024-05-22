import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChangeQuantity from './ChangeQuantity';

// 이미지 파일 모킹
jest.mock('../../../assets/plus.svg', () => 'plus.svg');
jest.mock('../../../assets/minus.svg', () => 'minus.svg');

describe('ChangeQuantity 컴포넌트', () => {
  test('수량 증가 버튼을 눌렀을 때, 수량이 1 증가해야 한다', () => {
    const increaseQuantity = jest.fn();
    render(<ChangeQuantity quantity={5} decreaseQuantity={jest.fn()} increaseQuantity={increaseQuantity} />);

    const increaseButton = screen.getByLabelText('plus');
    expect(increaseButton).toBeEnabled();

    fireEvent.click(increaseButton);
    expect(increaseQuantity).toHaveBeenCalledTimes(1);
  });

  test('수량 감소 버튼을 눌렀을 때, 수량이 1 감소해야 한다', () => {
    const decreaseQuantity = jest.fn();
    render(<ChangeQuantity quantity={5} decreaseQuantity={decreaseQuantity} increaseQuantity={jest.fn()} />);

    const decreaseButton = screen.getByLabelText('minus');
    expect(decreaseButton).toBeEnabled();

    fireEvent.click(decreaseButton);
    expect(decreaseQuantity).toHaveBeenCalledTimes(1);
  });

  test('수량이 1일 때 수량 감소 버튼이 비활성화 상태여야 한다', () => {
    render(<ChangeQuantity quantity={1} decreaseQuantity={jest.fn()} increaseQuantity={jest.fn()} />);

    const decreaseButton = screen.getByLabelText('minus');
    expect(decreaseButton).toBeDisabled();
  });

  test('수량이 1보다 클 때 수량 감소 버튼이 활성화 상태여야 한다', () => {
    render(<ChangeQuantity quantity={2} decreaseQuantity={jest.fn()} increaseQuantity={jest.fn()} />);

    const decreaseButton = screen.getByLabelText('minus');
    expect(decreaseButton).toBeEnabled();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

// 이미지 파일 모킹
jest.mock('../../../assets/check-true.svg', () => 'check-true.svg');
jest.mock('../../../assets/check-false.svg', () => 'check-false.svg');

describe('Checkbox 컴포넌트', () => {
  test('체크된 상태를 올바르게 렌더링한다', () => {
    render(<Checkbox state={true} handleClick={jest.fn()} />);
    const checkbox = screen.getByAltText('Checkbox');
    expect(checkbox).toHaveAttribute('src', 'check-true.svg');
  });

  test('체크되지 않은 상태를 올바르게 렌더링한다', () => {
    render(<Checkbox state={false} handleClick={jest.fn()} />);
    const checkbox = screen.getByAltText('Checkbox');
    expect(checkbox).toHaveAttribute('src', 'check-false.svg');
  });

  test('체크박스를 클릭했을 때 handleClick 함수가 호출된다', () => {
    const handleClick = jest.fn();
    render(<Checkbox state={false} handleClick={handleClick} />);
    const checkbox = screen.getByAltText('Checkbox');

    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

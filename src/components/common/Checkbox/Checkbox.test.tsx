import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from './Checkbox';

// 이미지 파일 모킹
jest.mock('../../../assets/check-true.svg', () => 'check-true.svg');
jest.mock('../../../assets/check-false.svg', () => 'check-false.svg');

describe('Checkbox 컴포넌트', () => {
  test('Checkbox 컴포넌트를 클릭했을 때 handleClick 함수가 호출된다', () => {
    const handleClick = jest.fn();
    render(<Checkbox state={false} handleClick={handleClick} />);
    const checkbox = screen.getByAltText('checkbox');

    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

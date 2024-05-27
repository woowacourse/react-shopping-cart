import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button 컴포넌트', () => {
  test('Button 컴포넌트가 클릭됐을 때, handleClick을 실행한다', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Clickable Button</Button>);

    fireEvent.click(screen.getByText('Clickable Button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
